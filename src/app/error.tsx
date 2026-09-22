"use client";

import StaleBuildRecovery from "@/components/StaleBuildRecovery";

/** Public-site error boundary — same recovery, same reasoning. */
export default function AppError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <StaleBuildRecovery {...props} />;
}
