import { CustomIcon } from "@/components/CustomIcon";

export const BlockedScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <CustomIcon iconName="Ban" size="4xl" />
        </div>

        <div className="space-y-4 text-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Account Blocked</h2>
            <p className="mt-2 text-muted-foreground">
              Your account has been suspended from the platform. Please contact the administrator if
              you believe this is an error.
            </p>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">What you can do:</p>
            <ul className="space-y-1 text-left">
              <li>• Contact the platform administrator</li>
              <li>• Provide additional context about your situation</li>
              <li>• Wait for a response regarding your appeal</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Common reasons for blocking:</p>
            <ul className="space-y-1 text-left">
              <li>• Violation of community guidelines</li>
              <li>• Inappropriate behavior or content</li>
              <li>• Multiple policy violations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
