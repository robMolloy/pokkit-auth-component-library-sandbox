import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useState } from "react";

interface AuthSigninProps {
  onSignIn: (success: boolean, message: string) => void;
}

export function AuthSignin({ onSignIn }: AuthSigninProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      await pb.collection("users").authWithPassword(email, password);
      onSignIn(true, "Successfully signed in!");
    } catch (err) {
      console.error("Sign in error:", err);
      onSignIn(false, "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          value={email}
          onInput={setEmail}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <TextInput
          value={password}
          onInput={setPassword}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
