"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const Page = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <button
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
            });
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen max-w-7xl flex-col gap-4">
    
      <header className="sticky top-0 z-50 w-full  border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16  items-center justify-between gap-4 px-4 sm:px-8 lg:px-20">
          <div className="flex items-center gap-3">
            
            <div className="leading-tight">
              <h1 className="text-lg font-semibold tracking-tight text-[#191919]">
                Travel
              </h1>
              <p className="text-xs font-light text-neutral-500">
                Manage your trips
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-medium text-[#191919]">
                {user.name}
              </p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
            {user.image ? (
              <Image
                alt={user.name ? `${user.name}'s profile picture` : "Profile picture"}
                src={user.image}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm outline outline-1 outline-neutral-200 transition hover:outline-neutral-400"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 ring-2 ring-white outline outline-1 outline-neutral-200">
                {initial}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="sm:px-8 lg:px-20">
        asdf
      </div>
    </div>
  );
};

export default Page;