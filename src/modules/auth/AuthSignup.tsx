import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useState } from "react";

interface AuthSignupProps {
  onSignUp: (success: boolean, message: string) => void;
}

export function AuthSignup({ onSignUp }: AuthSignupProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (password !== confirmPassword) {
      onSignUp(false, "Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await pb.collection("users").create({
        name,
        email,
        status: "pending",
        role: "standard",
        emailVisibility: true,
        password,
        passwordConfirm: password,
      });

      // After creating the user, log them in
      await pb.collection("users").authWithPassword(email, password);
      onSignUp(true, "Account created successfully!");
    } catch (e: unknown) {
      const error = e as { message: string };
      console.error("Sign up error:", error);
      onSignUp(false, error.message ?? "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <TextInput
          id="name"
          value={name}
          onInput={setName}
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-email">Email</Label>
        <TextInput
          id="signup-email"
          value={email}
          onInput={setEmail}
          name="signup-email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <TextInput
          id="signup-password"
          value={password}
          onInput={setPassword}
          name="signup-password"
          type="password"
          placeholder="Create a password"
          required
        />
      </div>
      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <TextInput
          id="confirm-password"
          value={confirmPassword}
          onInput={setConfirmPassword}
          name="confirm-password"
          type="password"
          placeholder="Confirm your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
