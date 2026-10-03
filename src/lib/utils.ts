import type { ErrorInfo } from "react";

export function logError(error: unknown, info: ErrorInfo) {
  console.error("Render error:", error, info.componentStack);
}
