import { Button } from "@/components/ui/button";
import { pb } from "@/config/pocketbaseConfig";
import { logout } from "@/modules/auth/dbAuthUtils";
import { useUsersStore } from "@/modules/users/usersStore";
import { useCurrentUserStore } from "@/stores/authDataStore";
import { Tooltip } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import { CustomIcon } from "../CustomIcon";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { PreserveScrollAbility } from "./Layout";

const SidebarButtonWrapper = (p: {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
}) => {
  return p.href ? (
    <Link href={p.disabled ? "#" : p.href} className={p.disabled ? "pointer-events-none" : ""}>
      {p.children}
    </Link>
  ) : (
    p.children
  );
};

const PossibleTooltipWrapper = (p: {
  children: React.ReactNode;
  tooltipContent?: React.ReactNode;
}) => {
  return p.tooltipContent ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{p.children}</TooltipTrigger>
        <TooltipContent>{p.tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <>{p.children}</>
  );
};

const SidebarButton = (p: {
  href?: string;
  iconName?: React.ComponentProps<typeof CustomIcon>["iconName"];
  children: React.ReactNode;
  isHighlighted: boolean;
  onClick?: () => void;
  badgeCount?: number;
  disabled?: boolean;
  tooltipContent?: React.ReactNode;
}) => {
  return (
    <SidebarButtonWrapper href={p.href} disabled={p.disabled}>
      <PossibleTooltipWrapper tooltipContent={p.tooltipContent}>
        <Button
          variant={p.isHighlighted ? "secondary" : "ghost"}
          className={`w-full ${p.disabled ? "pointer-events-none" : ""}`}
          onClick={p.onClick}
          disabled={p.disabled}
        >
          <span className="flex w-full items-center gap-2 text-left">
            {p.iconName && (
              <CustomIcon
                iconName={p.iconName}
                size="sm"
                className={p.disabled ? "text-muted-foreground" : ""}
              />
            )}

            {p.children}

            {p.badgeCount !== undefined && p.badgeCount > 0 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                {p.badgeCount}
              </span>
            )}
          </span>
        </Button>
      </PossibleTooltipWrapper>
    </SidebarButtonWrapper>
  );
};

const LeftSidebarTemplate = (p: {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
}) => {
  return (
    <PreserveScrollAbility className="border-r">
      <div className="flex flex-col gap-1 border-b p-2">{p.top}</div>
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">{p.middle}</div>
      <div className="flex flex-col gap-1 border-t p-2">{p.bottom}</div>
    </PreserveScrollAbility>
  );
};

export function LeftSidebar() {
  const router = useRouter();

  const currentUserStore = useCurrentUserStore();
  const usersStore = useUsersStore();
  const pendingUsersCount = usersStore.data.filter((user) => user.status === "pending").length;

  const isAdmin =
    currentUserStore.data.authStatus === "loggedIn" &&
    currentUserStore.data.user.status === "approved" &&
    currentUserStore.data.user.role === "admin";

  return (
    <LeftSidebarTemplate
      top={
        <>
          <SidebarButton href="/" iconName="Home" isHighlighted={router.pathname === "/"}>
            Home
          </SidebarButton>
          <SidebarButton
            href="/scroll"
            iconName="Ban"
            isHighlighted={router.pathname === "/scroll"}
          >
            Scroll
          </SidebarButton>
        </>
      }
      middle={[...Array(100)].map((_, j) => (
        <SidebarButton iconName="Ban" key={j} isHighlighted={j === 2}>
          do summit {j}
        </SidebarButton>
      ))}
      bottom={
        <>
          {isAdmin && (
            <SidebarButton
              href="/users"
              iconName="Users"
              isHighlighted={router.pathname === "/users"}
              badgeCount={pendingUsersCount}
            >
              Users
            </SidebarButton>
          )}
          <SidebarButton iconName="LogOut" isHighlighted={false} onClick={() => logout({ pb })}>
            Log Out
          </SidebarButton>
        </>
      }
    />
  );
}
