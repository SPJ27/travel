"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";

const page = () => {
  const { data: session, isPending } = authClient.useSession();
  console.log(session);
  return (
    <div>
      <button
        onClick={async () => {
          const data = await authClient.signIn.social({
            provider: "google",
          });
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default page;
