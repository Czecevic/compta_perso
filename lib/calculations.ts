import type { UserTicketRecord } from "@/interface";

export interface UserItem {
  id: number;
  name: string;
  revenu: number;
}

export interface TicketItem {
  id: number;
  categorie: string | null;
  montant: number | null;
  frequence: string | null;
}

export interface UserBreakdown extends UserItem {
  ratioRevenu: number;
  totalDue: number;
  amountPaid: number;
  amountRemaining: number;
  percentPaid: number;
  paidTickets: TicketItem[];
  unpaidTickets: TicketItem[];
}

export interface HouseholdStats {
  totalRevenu: number;
  totalCharge: number;
  averageTicket: number;
  userBreakdowns: UserBreakdown[];
  totalRemainingInHousehold: number;
  totalUnpaidTicketsCount: number;
}

export function calculateHouseholdStats(
  users: UserItem[],
  tickets: TicketItem[],
  userTickets: UserTicketRecord[]
): HouseholdStats {
  let totalRevenu = 0;
  let totalCharge = 0;

  users.forEach(({ revenu }) => (totalRevenu += revenu));
  tickets.forEach(({ montant }) => (totalCharge += montant ?? 0));

  const averageTicket = tickets.length > 0 ? totalCharge / tickets.length : 0;

  const userBreakdowns: UserBreakdown[] = users.map((user) => {
    const ratioRevenu = totalRevenu > 0 ? user.revenu / totalRevenu : 0;
    const totalDue = totalCharge * ratioRevenu;

    const paidTickets = tickets.filter((t) =>
      userTickets.some(
        (ut) => ut.userId === user.id && ut.ticketId === t.id && ut.isPaid
      )
    );

    const unpaidTickets = tickets.filter(
      (t) =>
        !userTickets.some(
          (ut) => ut.userId === user.id && ut.ticketId === t.id && ut.isPaid
        )
    );

    const amountPaid = paidTickets.reduce(
      (acc, t) => acc + (t.montant ?? 0) * ratioRevenu,
      0
    );

    const amountRemaining = unpaidTickets.reduce(
      (acc, t) => acc + (t.montant ?? 0) * ratioRevenu,
      0
    );

    const percentPaid = totalDue > 0 ? (amountPaid / totalDue) * 100 : 100;

    return {
      ...user,
      ratioRevenu,
      totalDue,
      amountPaid,
      amountRemaining,
      percentPaid,
      paidTickets,
      unpaidTickets,
    };
  });

  const totalRemainingInHousehold = userBreakdowns.reduce(
    (acc, u) => acc + u.amountRemaining,
    0
  );

  const totalUnpaidTicketsCount = userBreakdowns.reduce(
    (acc, u) => acc + u.unpaidTickets.length,
    0
  );

  return {
    totalRevenu,
    totalCharge,
    averageTicket,
    userBreakdowns,
    totalRemainingInHousehold,
    totalUnpaidTicketsCount,
  };
}
