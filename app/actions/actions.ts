"use server";
import { db } from "@/data/db";
import { ticketTable, usersTable } from "@/data/schema";

export const getUser = async () => {
  return await db.select().from(usersTable);
};

export const getTicket = async () => {
  return await db.select().from(ticketTable);
};
