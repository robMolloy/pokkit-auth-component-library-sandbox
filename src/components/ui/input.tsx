import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

type TInputParams = Parameters<typeof Input>[0];

export const TextInput = ({
  onInput,
  value,
  ...p
}: Omit<TInputParams, "type" | "onInput" | "value"> & {
  value: string;
  type?: "text" | "password" | "email";
  onInput: (x: string) => void;
}) => {
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => onInput(internalValue), [internalValue]);
  React.useEffect(() => setInternalValue(value), [value]);

  return (
    <Input
      type={p.type ?? "text"}
      {...p}
      value={internalValue}
      onInput={(e) => {
        const newValue = (e.target as unknown as { value: string }).value;
        setInternalValue(newValue);
      }}
    />
  );
};

export const FileInput = ({
  onInput,
  value,
  ...p
}: Omit<TInputParams, "type" | "onInput" | "value"> & {
  value: File | undefined;
  onInput: (x: File | undefined) => void;
}) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => setInternalValue(value), [value]);
  React.useEffect(() => onInput(internalValue), [internalValue]);

  React.useEffect(() => {
    if (inputRef.current && !internalValue) inputRef.current.value = "";
  }, [internalValue]);

  return (
    <Input
      {...p}
      type="file"
      ref={inputRef}
      onInput={(e) => {
        const file = (e.target as unknown as { files: File[] }).files[0];
        onInput(file);
      }}
    />
  );
};
