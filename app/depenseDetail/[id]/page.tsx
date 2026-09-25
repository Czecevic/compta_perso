import Link from "next/link";
import { getTicket } from "@/app/actions/actions";
import { ArrowLeft, Calendar, Tag, Receipt } from "lucide-react";

export default async function DepenseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tickets = await getTicket();
  const ticket = tickets.find((t) => t.id === Number(id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au tableau de bord</span>
      </Link>

      <div className="glass-card rounded-2xl p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Détail de la dépense #{id}
              </h1>
              <p className="text-xs text-slate-400">Catégorie: {ticket?.categorie || "Non spécifiée"}</p>
            </div>
          </div>
        </div>

        {ticket ? (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
              <span className="text-sm text-slate-400">Montant total</span>
              <span className="text-3xl font-black text-white">
                {(ticket.montant ?? 0).toLocaleString("fr-FR")} €
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <Tag className="w-3.5 h-3.5" /> Catégorie
                </div>
                <div className="font-semibold text-white">{ticket.categorie}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Fréquence
                </div>
                <div className="font-semibold text-white uppercase">{ticket.frequence}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            Dépense introuvable.
          </div>
        )}
      </div>
    </div>
  );
}
