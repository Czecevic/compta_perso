import { getTicket, getUser } from "./actions/actions";
import { TicketView } from "./components/TicketView";

export default async function Home() {
  const users = await getUser();
  const tickets = await getTicket();
  return (
    <div className="p-8">
      <div className="mb-8">
        {users.map((user) => (
          <h1 key={user.id} className="text-lg font-bold">
            {user.name} - {user.revenu}
          </h1>
        ))}
      </div>
      <TicketView users={users} tickets={tickets} />
    </div>
  );
}
