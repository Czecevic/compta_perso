import { Receipt, Clock, TrendingUp } from "lucide-react";

interface DashboardMetricsProps {
  totalCharge: number;
  totalRemainingInHousehold: number;
  totalUnpaidTicketsCount: number;
  totalRevenu: number;
  ticketsCount: number;
  usersCount: number;
}

export function DashboardMetrics({
  totalCharge,
  totalRemainingInHousehold,
  totalUnpaidTicketsCount,
  totalRevenu,
  ticketsCount,
  usersCount,
}: DashboardMetricsProps) {
  return (
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
            {ticketsCount} {ticketsCount > 1 ? "tickets" : "ticket"}
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
            {usersCount} {usersCount > 1 ? "membres" : "membre"}
          </span>
          <span>au foyer</span>
        </div>
      </div>
    </div>
  );
}
