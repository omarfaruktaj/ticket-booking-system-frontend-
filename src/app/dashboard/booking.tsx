// import { BookingResponse, getBooking } from "@/actions/booking-action";
// import { useQuery } from "@tanstack/react-query";

// export default function Booking() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: getBooking,
//   });
//   if (isLoading) return <div>Loading...</div>;
//   if (error)
//     return (
//       <div className=" text-3xl">No booking found. please book tricket</div>
//     );
//   if (!data)
//     return (
//       <div className=" text-3xl">No booking found. please book tricket</div>
//     );
//   const BookingStatusBadge = ({
//     status,
//   }: {
//     status: BookingResponse["status"];
//   }) => {
//     const statusColors = {
//       pending: "bg-yellow-100 text-yellow-800",
//       confirmed: "bg-green-100 text-green-800",
//       cancelled: "bg-red-100 text-red-800",
//     };

//     return (
//       <span className={`px-2 py-1 rounded ${statusColors[status]}`}>
//         {status}
//       </span>
//     );
//   };

//   const PaymentStatusBadge = ({
//     paymentStatus,
//   }: {
//     paymentStatus: BookingResponse["paymentStatus"];
//   }) => {
//     const statusColors = {
//       paid: "bg-green-100 text-green-800",
//       unpaid: "bg-red-100 text-red-800",
//     };

//     return (
//       <span className={`px-2 py-1 rounded ${statusColors[paymentStatus]}`}>
//         {paymentStatus}
//       </span>
//     );
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-3xl font-semibold mb-6">My Bookings</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 User
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Event
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Tickets Booked
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Status
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Payment Status
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Created At
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
//                 Updated At
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data &&
//               data.map((booking) => (
//                 <tr key={booking._id}>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     {booking.user}
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     {booking.event}
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     {booking.ticketsBooked}
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     <BookingStatusBadge status={booking.status} />
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     <PaymentStatusBadge paymentStatus={booking.paymentStatus} />
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     {new Date(booking.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 border-b border-gray-200">
//                     {new Date(booking.updatedAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { BookingResponse, getBooking } from "@/actions/booking-action";
import { useQuery } from "@tanstack/react-query";

export default function Booking() {
  const { data, isLoading, error } = useQuery<BookingResponse[]>({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-3xl">No booking found. Please book a ticket.</div>
    );
  if (!data || data.length === 0)
    return (
      <div className="text-3xl">No booking found. Please book a ticket.</div>
    );

  const BookingStatusBadge = ({
    status,
  }: {
    status: BookingResponse["status"];
  }) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-2 py-1 rounded ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const PaymentStatusBadge = ({
    paymentStatus,
  }: {
    paymentStatus: BookingResponse["paymentStatus"];
  }) => {
    const statusColors = {
      paid: "bg-green-100 text-green-800",
      unpaid: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-2 py-1 rounded ${statusColors[paymentStatus]}`}>
        {paymentStatus}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                User
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Event
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Tickets Booked
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Payment Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Created At
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.user}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.event}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.ticketsBooked}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <PaymentStatusBadge paymentStatus={booking.paymentStatus} />
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {new Date(booking.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
