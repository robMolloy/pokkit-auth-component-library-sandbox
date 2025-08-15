import { CustomIcon } from "@/components/CustomIcon";

export const AwaitingApprovalScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <CustomIcon iconName="Clock" size="4xl" />
        </div>

        <div className="space-y-4 text-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Awaiting Approval</h2>
            <p className="mt-2 text-muted-foreground">
              This is a closed product. Your account requires administrator approval before you can
              access the platform.
            </p>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">What happens next?</p>
            <ul className="space-y-1 text-left">
              <li>• Your account will be reviewed by an administrator</li>
              <li>• You'll receive an email notification once approved</li>
              <li>• This process typically takes 24-48 hours</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Need help?</p>
            <p className="text-left">
              If you have any questions about your account or the approval process, please contact
              the administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
