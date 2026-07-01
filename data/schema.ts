import {
  pgTable,
  serial,
  text,
  integer,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

export const frequenceEnum = pgEnum("frequence_role", [
  "mensuel",
  "annuel",
  "unique",
]);

export const categorieEnum = pgEnum("categorie_precise", [
  "Loyer",
  "Abonnement",
  "Gaz/Electricité",
  "Course",
  "Autre",
]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  revenu: integer("revenu").notNull(),
  name: text("name").notNull(),
});

export const ticketTable = pgTable("ticket", {
  id: serial("id").primaryKey(),
  categorie: categorieEnum("categorie"),
  montant: integer("montant"),
  frequence: frequenceEnum("frequence").default("mensuel"),
});

export const userTicketTable = pgTable(
  "user_ticket",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    ticketId: integer("ticket_id")
      .notNull()
      .references(() => ticketTable.id, {
        onDelete: "cascade",
      }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.ticketId] }),
    };
  },
);
