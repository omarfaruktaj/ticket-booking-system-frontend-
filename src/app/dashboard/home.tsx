import { getEvents } from "@/actions/events-action";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (isLoading) return "loading..";

  return (
    <div>
      <h1 className=" text-3xl mb-5">Aavailable events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {data?.map(
          ({
            _id,
            title,
            description,
            date,
            venue,
            capacity,
            banner,
            price,
            ticketsAvailable,
          }) => (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover object-center"
                src={banner}
                alt={title}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mb-2">{description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    Date: {new Date(date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">Venue: {venue}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">Capacity: {capacity}</p>
                  <p className="text-gray-700">Price: ${price}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">
                    Tickets Available: {ticketsAvailable}
                  </p>
                  <div className=" flex  gap-4">
                    <Button variant={"outline"} asChild>
                      <Link to={`events/${_id}`}>See details</Link>
                    </Button>
                    <Button>Buy Ticket</Button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
