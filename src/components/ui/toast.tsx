import { Toast } from "@base-ui/react/toast";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const toastManager = Toast.createToastManager();

export type ToastType = "default" | "error" | "success";

export function showToast({
  title,
  description,
  type = "default",
}: {
  title: string;
  description?: string;
  type?: ToastType;
}) {
  return toastManager.add({
    title,
    description,
    type,
    priority: type === "error" ? "high" : "low",
  });
}

function ToastViewportList() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2 pl-8 outline-none sm:pl-0">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            className={cn(
              "relative flex items-start justify-between gap-3 rounded-xl border bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none",
              "motion-safe:transition-all motion-reduce:transition-opacity duration-200",
              "data-starting-style:opacity-0 motion-safe:data-starting-style:translate-y-2",
              "data-ending-style:opacity-0 motion-safe:data-ending-style:translate-y-2",
              "data-limited:hidden",
              toast.type === "error" && "border-destructive/50",
            )}
          >
            <Toast.Content className="flex min-w-0 flex-1 flex-col gap-1">
              {toast.title && (
                <Toast.Title
                  className={cn(
                    "font-semibold leading-snug",
                    toast.type === "error" && "text-destructive",
                  )}
                />
              )}
              {toast.description && (
                <Toast.Description className="text-xs leading-relaxed text-muted-foreground" />
              )}
            </Toast.Content>
            <Toast.Close
              aria-label="Close notification"
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="-mt-0.5 -mr-1 shrink-0 text-muted-foreground hover:text-foreground"
                />
              }
            >
              <XIcon className="size-4" />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={toastManager} timeout={4000} limit={3}>
      <ToastViewportList />
    </Toast.Provider>
  );
}
