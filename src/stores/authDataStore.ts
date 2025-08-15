import { TUser, userSchema } from "@/modules/users/dbUsersUtils";
import PocketBase from "pocketbase";
import { useEffect } from "react";
import { z } from "zod";
import { create } from "zustand";

const pocketbaseAuthStoreSchema = z.object({
  token: z.string(),
  record: userSchema,
});
type TAuth = z.infer<typeof pocketbaseAuthStoreSchema>;

type TState = { authStatus: "loading" | "loggedOut" } | { authStatus: "loggedIn"; user: TAuth };

export const useUnverifiedIsLoggedInStore = create<{
  data: TState;
  setData: (x: TState) => void;
}>()((set) => ({
  data: { authStatus: "loading" },
  setData: (data) => set(() => ({ data })),
}));

export const useUnverifiedIsLoggedInSync = (p: { pb: PocketBase }) => {
  const isLoggedInStore = useUnverifiedIsLoggedInStore();
  useEffect(() => {
    if (!p.pb.authStore.isValid) return isLoggedInStore.setData({ authStatus: "loggedOut" });

    const resp = pocketbaseAuthStoreSchema.safeParse(p.pb.authStore);
    isLoggedInStore.setData(
      resp.success ? { authStatus: "loggedIn", user: resp.data } : { authStatus: "loggedOut" },
    );
  }, []);

  useEffect(() => {
    p.pb.authStore.onChange(() => {
      if (!p.pb.authStore.isValid) return isLoggedInStore.setData({ authStatus: "loggedOut" });

      const resp = pocketbaseAuthStoreSchema.safeParse(p.pb.authStore);
      isLoggedInStore.setData(
        resp.success ? { authStatus: "loggedIn", user: resp.data } : { authStatus: "loggedOut" },
      );
    });
  }, []);
};

type TCurrentUserState =
  | { authStatus: "loading" | "loggedOut" }
  | { authStatus: "loggedIn"; user: TUser };

export const useCurrentUserStore = create<{
  data: TCurrentUserState;
  setData: (x: TCurrentUserState) => void;
}>()((set) => ({
  data: { authStatus: "loading" },
  setData: (data) => set(() => ({ data })),
}));
