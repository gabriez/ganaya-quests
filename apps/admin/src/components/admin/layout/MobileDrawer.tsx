"use client";

import { ADMIN_LINKS } from "@shared/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * MobileDrawer — overlay drawer for the admin panel on mobile viewports.
 *
 * Follows the web MobileSidebar.tsx pattern with glassmorphism styling
 * (glass-card-strong), slide-in animation from the left, backdrop click
 * to close, and route-change auto-close. Displays the same nav items
 * as AdminSidebar adapted for the mobile overlay context.
 */
export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Backdrop */}
      <div
        className={
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden " +
          (open ? "opacity-100" : "opacity-0 pointer-events-none")
        }
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={
          "fixed top-0 left-0 z-[45] h-dvh w-72 glass-card-strong pt-20 pb-6 grid grid-cols-1 grid-rows-[auto_1fr_auto_auto] transition-transform duration-300 md:hidden " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* ── Logo / Close Area ── */}
        <div className="flex items-center justify-between pr-4 pl-6 self-start">
          <div className="flex items-center gap-3">
            <div className="block p-2 bg-primary/20 rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">
                admin_panel_settings
              </span>
            </div>
            <div>
              <p className="font-(--font-plus-jakarta-sans) text-title-md font-semibold text-on-surface whitespace-nowrap leading-tight">
                Midnight Harbor
              </p>
              <p className="font-(--font-be-vietnam-pro) text-label-sm text-secondary whitespace-nowrap leading-tight">
                Elite Member
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-surface-container-high transition-colors"
            aria-label="Cerrar menú"
            type="button"
          >
            <span className="material-symbols-outlined text-on-surface">
              close
            </span>
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="mt-6 self-start">
          <ul className="flex flex-col">
            {ADMIN_LINKS.map((link) => (
              <li
                key={link.path}
                className={
                  "relative font-medium transition-colors " +
                  (isActive(link.path)
                    ? "bg-primary/10 text-primary border-r-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant")
                }
              >
                <Link className="flex items-center gap-3 p-3" href={link.path}>
                  <span
                    className={
                      "material-symbols-outlined " +
                      (isActive(link.path)
                        ? "text-primary"
                        : "text-on-surface-variant")
                    }
                  >
                    {link.icon}
                  </span>
                  <span className="pt-0.5 whitespace-nowrap">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Spacer ── */}
        <div />

        {/* ── Claim Daily Bonus CTA ── */}
        <div className="px-4 py-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-label-md py-3 px-4 rounded-lg transition-all duration-200 hover:bg-secondary-fixed-dim active:scale-[0.98] glow-gold-sm"
          >
            <span className="material-symbols-outlined text-lg">redeem</span>
            <span>Claim Daily Bonus</span>
          </button>
        </div>

        {/* ── Settings + Logout ── */}
        <div className="border-t border-outline-variant/30 pt-2">
          <Link
            href="#"
            className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant transition-colors rounded-md"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Configuración</span>
          </Link>

          <button
            type="button"
            className="w-full flex items-center gap-3 p-3 hover:cursor-pointer text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant transition-colors rounded-md"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/";
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Cierra sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
