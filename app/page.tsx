"use client";
import { authClient } from "@/lib/auth-client";
import TopBar from "@/components/TopBar";
import { FaPlane, FaPlaneArrival, FaPlaneDeparture, FaPlaneLock, FaPlaneUp } from "react-icons/fa6";

const Page = () => {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: organizations } = authClient.useListOrganizations()

  if (isSessionPending) {
    return <div>Loading...</div>;
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

  const trips = [
    {
      destination: "Philadelphia",
      date: "February, 2027",
      image:
        "https://www.visittheusa.com/wp-content/uploads/2025/12/Philadelphia-Skyline-from-Philadelphia-Museum-of-Art-11920px.jpg",
    },
    {
      destination: "Japan",
      date: "January, 2026",
      image:
        "https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2025/04/17-days-in-japan-itinerary-tokyo-scaled.jpg?fit=2560%2C1707&ssl=1",
    },
    {
      destination: "New York",
      date: "March, 2026",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive,w_750,c_limit,q_60/Mobile/City/szhx3ytpgfnhpbmsngk0.jpg",
    },
    {
      destination: "Australia",
      date: "April, 2026",
      image:
        "https://content.r9cdn.net/rimg/dimg/2e/4d/e27e04f5-city-13998-166a6398190.jpg?crop=true&width=1020&height=498"

      ,
    },
    {
      destination: "Mumbai",
      date: "May, 2026",
      image:
        "https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg",

    }
  ];

  return (
    <div className="flex min-h-screen flex-col gap-4">

      <TopBar user={user} initial={initial} />
      <div className="py-4 space-y-10 sm:px-8  lg:px-20">
        <div>
        <h2 className="text-2xl flex items-center gap-1 font-semibold tracking-tight text-neutral-900">
              <FaPlaneUp className="text-xl"/> Your trips
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Explore and manage your destinations.
            </p>
</div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">

          {organizations?.map((trip) => (
            <div
              key={trip.id}
              className="relative h-56 w-full overflow-hidden rounded-xl bg-cover bg-center shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
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
                <p className="mt-0.5 text-sm text-white/80">
                  {trip.metadata?.destination || "Destination not available"}
                </p>
              </div>
            </div>
          ))}
        </div></div>
    </div>
  );
};

export default Page;

