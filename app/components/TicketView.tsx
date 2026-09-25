"use client";

import Link from "next/link";
import { UserView } from "./UserView";
import type { userTicketProps } from "@/interface";
import {
  Receipt,
  Home,
  Tv,
  Zap,
  ShoppingBag,
  Tag,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

const getCategoryBadge = (categorie: string | null) => {
  switch (categorie) {
    case "Loyer":
      return {
        icon: Home,
        label: "Loyer",
        style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      };
    case "Abonnement":
      return {
        icon: Tv,
        label: "Abonnement",
        style: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      };
    case "Gaz/Electricité":
      return {
        icon: Zap,
        label: "Gaz / Électricité",
        style: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      };
    case "Course":
      return {
        icon: ShoppingBag,
        label: "Courses",
        style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    default:
      return {
        icon: Tag,
        label: categorie || "Autre",
        style: "bg-slate-500/10 text-slate-300 border-slate-500/20",
      };
  }
};

const getFrequenceBadge = (frequence: string | null) => {
  switch (frequence) {
    case "mensuel":
      return "Mensuel";
    case "annuel":
      return "Annuel";
    case "unique":
      return "Ponctuel";
    default:
      return "Mensuel";
  }
};

export const TicketView = ({ tickets, users, userTickets }: userTicketProps) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold tracking-tight text-white">
            Tickets & Dépenses
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          {tickets.length} {tickets.length > 1 ? "éléments" : "élément"}
        </span>
      </div>

      {/* Grid of Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tickets.map((ticket) => {
          const categoryInfo = getCategoryBadge(ticket.categorie);
          const CategoryIcon = categoryInfo.icon;
          const montantFormatted = (ticket.montant ?? 0).toLocaleString("fr-FR");

          return (
            <div
              key={ticket.id}
              className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              {/* Card Header: Category & Frequency Badges */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${categoryInfo.style}`}
                >
                  <CategoryIcon className="w-3.5 h-3.5" />
                  <span>{categoryInfo.label}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{getFrequenceBadge(ticket.frequence)}</span>
                </div>
              </div>

              {/* Amount & Title */}
              <div className="space-y-1 my-2">
                <div className="text-3xl font-black text-white tracking-tight">
                  {montantFormatted} <span className="text-base font-medium text-indigo-400">€</span>
                </div>
                <Link
                  href={`/depenseDetail/${ticket.id}`}
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors group-hover:translate-x-0.5"
                >
                  <span>Détails de la dépense</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* User Payment Checklist */}
              <UserView users={users} id={ticket.id} userTickets={userTickets} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
