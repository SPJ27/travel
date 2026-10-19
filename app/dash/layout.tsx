import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import TopBar from "@/components/TopBar";

const TopBarSkeleton = () => (
  <div className="h-16 w-full border-b border-neutral-200/80 bg-white" />
);

async function AuthedTopBar() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return <></>;

  const { user } = session;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return <TopBar user={user} initial={initial} />;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Suspense fallback={<TopBarSkeleton />}>
        <AuthedTopBar />
      </Suspense>
      <div className="space-y-10 py-4 sm:px-8 lg:px-20">{children}</div>
    </div>
  );
}