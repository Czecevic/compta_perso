import type { UserBreakdown } from "@/lib/calculations";
import { CheckCircle2, Clock } from "lucide-react";

interface UserBreakdownCardProps {
  user: UserBreakdown;
  colorIndex: number;
}

export function UserBreakdownCard({ user, colorIndex }: UserBreakdownCardProps) {
  const percentage = (user.ratioRevenu * 100).toFixed(1);
  const remainingFloor = Math.ceil(user.amountRemaining);
  const paidFloor = Math.floor(user.amountPaid);
  const totalDueFloor = Math.floor(user.totalDue);
  const isFullyPaid = remainingFloor <= 0;

  const colors = [
    { bg: "from-indigo-600 to-violet-600", bar: "bg-indigo-500", text: "text-indigo-400" },
    { bg: "from-purple-600 to-pink-600", bar: "bg-purple-500", text: "text-purple-400" },
    { bg: "from-emerald-600 to-teal-600", bar: "bg-emerald-500", text: "text-emerald-400" },
  ];
  const color = colors[colorIndex % colors.length];

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-5 relative flex flex-col justify-between">
      {/* Top User Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-black text-lg shadow-md`}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{user.name}</h3>
            <p className="text-xs text-slate-400">
              Revenu:{" "}
              <span className="font-semibold text-slate-300">
                {user.revenu.toLocaleString("fr-FR")} €
              </span>{" "}
              ({percentage}%)
            </p>
          </div>
        </div>

        {/* Main Highlight: Reste à Payer */}
        <div className="text-right">
          <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider block mb-0.5">
            Reste à payer
          </span>
          <div
            className={`text-2xl font-black ${
              isFullyPaid ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {remainingFloor.toLocaleString("fr-FR")}{" "}
            <span className="text-sm font-medium">€</span>
          </div>
        </div>
      </div>

      {/* Paid vs Due Numbers */}
      <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl border border-white/5 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Déjà réglé</span>
          <span className="font-bold text-emerald-400 text-sm">
            {paidFloor.toLocaleString("fr-FR")} €
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Part totale due</span>
          <span className="font-bold text-slate-200 text-sm">
            {totalDueFloor.toLocaleString("fr-FR")} €
          </span>
        </div>
      </div>

      {/* Progress bar of payments */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-400">Progression des règlements</span>
          <span
            className={`font-bold ${
              isFullyPaid ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {user.percentPaid.toFixed(0)}% réglé
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFullyPaid
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
            style={{ width: `${Math.min(100, user.percentPaid)}%` }}
          />
        </div>
      </div>

      {/* Detailed Unpaid Tickets List for this User */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            {isFullyPaid ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {isFullyPaid
                ? "Toutes les charges sont payées !"
                : `Dépenses en attente (${user.unpaidTickets.length})`}
            </span>
          </span>
        </div>

        {!isFullyPaid && (
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {user.unpaidTickets.map((ticket) => {
              const userShare = Math.round(
                (ticket.montant ?? 0) * user.ratioRevenu
              );
              return (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                >
                  <span className="font-medium text-white">
                    {ticket.categorie || "Dépense"}
                  </span>
                  <span className="font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    doit {userShare} €
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
