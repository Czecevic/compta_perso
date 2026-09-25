export interface UserTicketRecord {
  userId: number;
  ticketId: number;
  isPaid: boolean | null;
}

export interface userTicketProps {
  users: {
    id: number;
    name: string;
    revenu: number;
  }[];
  tickets: {
    id: number;
    categorie:
      | "Loyer"
      | "Abonnement"
      | "Gaz/Electricité"
      | "Course"
      | "Autre"
      | null;
    montant: number | null;
    frequence: "mensuel" | "annuel" | "unique" | null;
  }[];
  userTickets?: UserTicketRecord[];
}

export interface userProps {
  users: {
    id: number;
    name: string;
    revenu: number;
  }[];
  id: number;
  userTickets?: UserTicketRecord[];
}
