import Link from "next/link";
import { UserView } from "./UserView";
import type { userTicketProps } from "@/interface";

export const TicketView = ({ tickets, users }: userTicketProps) => {
  return (
    <div className="flex flex-wrap gap-5">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex flex-col border rounded-md items-center p-5 w-full md:w-1/3 lg:w-1/3"
        >
          <Link
            href={`/depenseDetail/${ticket.id}`}
            className=" text-gray-100 hover:underline font-semibold text-lg"
          >
            {ticket.categorie}
          </Link>
          <h2 className="text-gray-500 mb-4">{ticket.montant} €</h2>
          <input type="hidden" name="ticketId" value={ticket.id} />
          <UserView users={users} id={ticket.id} />
        </div>
      ))}
    </div>
  );
};
