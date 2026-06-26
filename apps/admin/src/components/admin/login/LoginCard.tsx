"use client";

import type { ReactNode } from "react";

interface LoginCardProps {
  /** Brand logo icon (Material Symbols name) */
  icon?: string;
  /** Brand title */
  title: string;
  /** Brand subtitle */
  subtitle?: string;
  /** Card body content */
  children: ReactNode;
  /** Footer content (shown below a divider) */
  footer?: ReactNode;
}

/**
 * LoginCard — molécula que envuelve el formulario en el glassmorphism card
 * con el branding (logo + título + subtítulo) y un footer opcional.
 *
 * Es "flexible" porque combina brand + card en un solo componente
 * sin forzar una separación atómica innecesaria.
 */
export default function LoginCard({
  icon = "admin_panel_settings",
  title,
  subtitle,
  children,
  footer,
}: LoginCardProps) {
  return (
    <div className="w-full max-w-[440px] glass-card rounded-xl p-8 md:p-10 shadow-2xl relative animate-in fade-in zoom-in duration-700">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-stack-lg">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-stack-sm shadow-[0_0_30px_rgba(123,208,255,0.2)]">
          <span className="material-symbols-outlined text-on-primary-container !text-[32px]">
            {icon}
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="font-label-md text-label-md text-on-surface-variant mt-1 uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </div>

      {/* Body */}
      {children}

      {/* Footer */}
      {footer && (
        <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/20 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}
