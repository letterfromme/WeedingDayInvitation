import { Suspense } from "react";
import { InviteHome } from "@/components/InviteHome";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--ivory)]" />}>
      <InviteHome />
    </Suspense>
  );
}
