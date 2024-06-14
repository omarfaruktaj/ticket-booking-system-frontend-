import { getAEvent } from "@/actions/events-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { createBooking } from "@/actions/booking-action";

const SingleEventPage = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticketCount, setTicketCount] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getAEvent(id as string),
  });
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast({
        title: "Successfully booked",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error when booking ",
        description: error.message,
      });
    },
  });

  if (isLoading) return "loading..";
  if (!data) return "No data available";

  const {
    _id,
    title,
    description,
    date,
    venue,
    capacity,
    banner,
    price,
    ticketsAvailable,
  } = data;

  const handleBookingTicket = async (id: string) => {
    if (!auth?.user) {
      navigate("/login");
      toast({
        title: "Please login to buy ticket",
      });
    } else {
      console.log(ticketCount);
      mutation.mutate({
        event: id,
        ticketsBooked: ticketCount,
      });
    }
  };

  const incrementTicketCount = () => {
    setTicketCount((value) => value + 1);
  };

  const decrementTicketCount = () => {
    if (ticketCount > 1) {
      setTicketCount((value) => value - 1);
    }
  };

  return (
    <div className="max-w-3xl  px-4 py-8">
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer justify-start mb-8 gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        <p className="text-xl"> Back</p>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={banner}
          alt={title}
        />
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-700 mb-2">
            Date: {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-2">Venue: {venue}</p>
          <p className="text-gray-700 mb-2">Capacity: {capacity}</p>
          <p className="text-gray-700 mb-2">Price: ${price}</p>
          <p className="text-gray-700 mb-2">
            Tickets Available: {ticketsAvailable}
          </p>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center gap-2 mb-4">
            <Button onClick={decrementTicketCount}>-</Button>
            <Input
              type="number"
              value={ticketCount}
              readOnly
              className="w-16 text-center"
            />
            <Button onClick={incrementTicketCount}>+</Button>
          </div>
          <Button onClick={() => handleBookingTicket(_id)}>Buy Ticket</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
