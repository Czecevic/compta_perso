"use server";
import { db } from "@/data/db";
import { ticketTable, usersTable, userTicketTable } from "@/data/schema";
import { revalidatePath } from "next/cache";

export const getUser = async () => {
  return await db.select().from(usersTable);
};

export const getTicket = async () => {
  return await db.select().from(ticketTable);
};

export const getUserTicket = async () => {
  return await db.select().from(userTicketTable);
};

export const toggleUserTicketPaid = async (
  userId: number,
  ticketId: number,
  isPaid: boolean
) => {
  await db
    .insert(userTicketTable)
    .values({ userId, ticketId, isPaid })
    .onConflictDoUpdate({
      target: [userTicketTable.userId, userTicketTable.ticketId],
      set: { isPaid },
    });

  revalidatePath("/");
};
