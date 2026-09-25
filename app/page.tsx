import { getTicket, getUser, getUserTicket } from "./actions/actions";
import { TicketView } from "./components/TicketView";
import {
  Users,
  Receipt,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default async function Home() {
  const users = await getUser();
  const tickets = await getTicket();
  const userTickets = await getUserTicket();

  let totalRevenu = 0;
  let totalCharge = 0;
  users.forEach(({ revenu }) => (totalRevenu += revenu));
  tickets.forEach(({ montant }) => (totalCharge += montant ?? 0));

  const averageTicket = tickets.length > 0 ? totalCharge / tickets.length : 0;

  // Calculate detailed user payment breakdown
  const userBreakdowns = users.map((user) => {
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

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
        Tableau de Bord
      </h1>
      {/* Total remaining header badge */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
        <div className={`p-2.5 rounded-xl ${totalRemainingInHousehold > 0 ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
          {totalRemainingInHousehold > 0 ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
        </div>
        <div>
          <div className="text-xs text-slate-400">Reste total à régler</div>
          <div className="text-lg font-bold text-white">
            {Math.round(totalRemainingInHousehold).toLocaleString("fr-FR")} €
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Charges Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total des charges
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-white">
            {totalCharge.toLocaleString("fr-FR")} <span className="text-lg font-medium text-indigo-400">€</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-white/5 font-medium text-slate-300">
              {tickets.length} {tickets.length > 1 ? "tickets" : "ticket"}
            </span>
            <span>enregistrés</span>
          </div>
        </div>

        {/* Total Reste à Payer Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Reste à régler au total
            </span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-white">
            {Math.round(totalRemainingInHousehold).toLocaleString("fr-FR")} <span className="text-lg font-medium text-amber-400">€</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20">
              {totalUnpaidTicketsCount} {totalUnpaidTicketsCount > 1 ? "paiements impayés" : "paiement impayé"}
            </span>
          </div>
        </div>

        {/* Total Revenus Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Revenu total foyer
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-white">
            {totalRevenu.toLocaleString("fr-FR")} <span className="text-lg font-medium text-purple-400">€</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-white/5 font-medium text-slate-300">
              {users.length} {users.length > 1 ? "membres" : "membre"}
            </span>
            <span>au foyer</span>
          </div>
        </div>
      </div>

      {/* User Share & Unpaid Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Qui doit payer quoi ?
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Calcul en direct selon le statut des tickets
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {userBreakdowns.map((user, idx) => {
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
            const color = colors[idx % colors.length];

            return (
              <div
                key={user.id}
                className="glass-card glass-card-hover rounded-2xl p-6 space-y-5 relative flex flex-col justify-between"
              >
                {/* Top User Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center text-white font-black text-lg shadow-md`}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        {user.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Revenu: <span className="font-semibold text-slate-300">{user.revenu.toLocaleString("fr-FR")} €</span> ({percentage}%)
                      </p>
                    </div>
                  </div>

                  {/* Main Highlight: Reste à Payer */}
                  <div className="text-right">
                    <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider block mb-0.5">
                      Reste à payer
                    </span>
                    <div
                      className={`text-2xl font-black ${isFullyPaid
                        ? "text-emerald-400"
                        : "text-amber-400"
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
                    <span className={`font-bold ${isFullyPaid ? "text-emerald-400" : "text-amber-400"}`}>
                      {user.percentPaid.toFixed(0)}% réglé
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isFullyPaid ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-orange-500"
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
          })}
        </div>
      </div>

      {/* Tickets List */}
      <TicketView users={users} tickets={tickets} userTickets={userTickets} />
    </div >
  );
}
