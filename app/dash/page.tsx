"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaPlaneUp } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import CreateTripModal from "@/components/CreateTripModal";
import Loading from "./loading";

// Safe against null metadata, string metadata, or object metadata
const getTripDate = (metadata: unknown): string | undefined => {
  try {
    const parsed = typeof metadata === "string" ? JSON.parse(metadata) : metadata;
    return (parsed as { date?: string } | null)?.date;
  } catch {
    return undefined;
  }
};

const Page = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: organizations } = authClient.useListOrganizations();
  const [modalOpen, setModalOpen] = useState(false); // must be above any early return

  if (isSessionPending) return <Loading />;

  if (!session) {
    return (
      <button onClick={() => authClient.signIn.social({ provider: "google" })}>
        Sign In
      </button>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="flex items-center gap-1 text-2xl font-semibold tracking-tight text-neutral-900">
            <FaPlaneUp className="text-xl" /> Your trips
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Explore and manage your destinations.
          </p>
        </div>
        <div>
          <Button onClick={() => setModalOpen(true)} text="Create Trip" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {organizations?.map((trip) => (
          <div
            key={trip.id}
            className="relative h-56 w-full overflow-hidden rounded-xl bg-neutral-800 bg-cover bg-center shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:scale-[0.99]"
            style={trip.logo ? { backgroundImage: `url("${trip.logo}")` } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h2 className="text-3xl font-semibold tracking-tight">{trip.name}</h2>
              <p className="mt-0.5 text-sm text-white/80">
                {getTripDate(trip.metadata) || "Date not available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <CreateTripModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Page;