"use client";
import { authClient } from "@/lib/auth-client";
import TopBar from "@/components/TopBar";
import { FaPlane, FaPlaneArrival, FaPlaneDeparture, FaPlaneLock, FaPlaneUp } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { redirect } from "next/navigation";
import Loading from "./loading";

const Page = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: organizations } = authClient.useListOrganizations()

  if (isSessionPending) {
    return Loading()
  }
  console.log(organizations)
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
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl flex items-center gap-1 font-semibold tracking-tight text-neutral-900">
            <FaPlaneUp className="text-xl" /> Your trips
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Explore and manage your destinations.
          </p>
        </div>
        <div>
          <Button onClick={() => redirect('/app/trip/new')} text="Create Trip" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">

        {organizations?.map((trip) => (
          <div
            key={trip.id}
            className="relative h-56 w-full active:translate-y-0 active:scale-[0.99] overflow-hidden rounded-xl bg-cover bg-center shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            style={{
              backgroundImage: `url("${trip.logo}")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h2 className="text-3xl font-semibold tracking-tight">
                {trip.name}
              </h2>

              <p className="mt-0.5 text-sm text-white/80">
                {JSON.parse(trip.metadata).date || "Date not available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;

