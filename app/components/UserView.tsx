"use client";

import { userProps } from "@/interface";
import { useState, useEffect, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { toggleUserTicketPaid } from "@/app/actions/actions";

export const UserView = ({ users, id, userTickets }: userProps) => {
  const [checkedUsers, setCheckedUsers] = useState<Record<number, boolean>>({});
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const initialState = users.reduce((acc, user) => {
      const found = userTickets?.find(
        (ut) => ut.userId === user.id && ut.ticketId === id
      );
      acc[user.id] = !!found?.isPaid;
      return acc;
    }, {} as Record<number, boolean>);

    setCheckedUsers(initialState);
  }, [userTickets, users, id]);

  const togglePayed = (userId: number) => {
    const currentPaidStatus = !!checkedUsers[userId];
    const newPaidStatus = !currentPaidStatus;

    // Optimistic UI update
    setCheckedUsers((prev) => ({
      ...prev,
      [userId]: newPaidStatus,
    }));
    setPendingUserId(userId);

    startTransition(async () => {
      try {
        await toggleUserTicketPaid(userId, id, newPaidStatus);
      } catch (err) {
        console.error("Erreur lors de la mise à jour du statut de paiement:", err);
        // Revert optimistic update on failure
        setCheckedUsers((prev) => ({
          ...prev,
          [userId]: currentPaidStatus,
        }));
      } finally {
        setPendingUserId(null);
      }
    });
  };

  return (
    <div className="space-y-2 w-full pt-3 border-t border-white/10">
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Paiement du ticket
      </div>
      <div className="grid grid-cols-2 gap-2">
        {users.map((user) => {
          const isChecked = !!checkedUsers[user.id];
          const isLoading = pendingUserId === user.id;

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => togglePayed(user.id)}
              disabled={isLoading}
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border text-left ${
                isChecked
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-sm"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors border ${
                    isChecked
                      ? "bg-emerald-500 border-emerald-400 text-white"
                      : "border-slate-500/40 bg-slate-800/50"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="truncate">{user.name}</span>
              </div>
              {isLoading && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
