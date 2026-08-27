"use client";

import { motion } from "framer-motion";

import { CashIcon } from "@shared/icons/CashIcon";

import { PlusIcon } from "@/icons";

export const Balance = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2.5 bg-surface-container-high/80 hover:bg-surface-container-high border border-white/10 px-3.5 py-1.5 rounded-xl transition-all shadow-inner"
      >
        <div className="shrink-0 drop-shadow-[0_0_8px_rgba(255,198,64,0.4)]">
          <CashIcon fill="#FFC640" height={20} width={20} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider leading-tight">
            Saldo
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-bold text-secondary tracking-tight">
              1.000
            </span>
            <span className="text-[10px] font-semibold text-primary">USD</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Deposit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        className="hidden sm:inline-flex items-center justify-center p-2 rounded-xl bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-secondary text-xs font-bold transition-colors cursor-pointer"
        aria-label="Depositar fondos"
      >
        <PlusIcon className="w-3.5 h-3.5 text-secondary" />
      </motion.button>
    </div>
  );
};
