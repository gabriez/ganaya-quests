"use client";

import { ADMIN_TOKEN } from "@shared/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { MobileDrawer } from "@/components/admin/layout/MobileDrawer";

/**
 * PanelLayout — authenticated admin shell for all /panel/* routes.
 *
 * Provides:
 * 1. Session guard (redirects to /login if no adminToken in localStorage)
 * 2. Desktop collapsible sidebar (AdminSidebar)
 * 3. Mobile overlay drawer (MobileDrawer)
 * 4. Responsive content area with proper padding per Midnight Harbor specs
 *
 * Follows the spec requirement REQ-LAYOUT-001 (Session Guard),
 * REQ-LAYOUT-002 (Sidebar Navigation), and REQ-LAYOUT-003 (Responsive Shell).
 */
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Session guard: check for auth token on mount
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem(ADMIN_TOKEN);
    if (!token) {
      router.replace("/");
    }
  }, [router]);

  // Don't render anything until mounted to avoid flash of content
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Mobile hamburger trigger — only visible < 768px */}
      <button
        type="button"
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-surface-container border border-outline-variant/30 md:hidden hover:bg-surface-container-high transition-colors"
        onClick={() => setDrawerOpen(true)}
        aria-label="Abrir menú"
      >
        <span className="material-symbols-outlined text-on-surface">menu</span>
      </button>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Content area */}
      <main className="flex-1 min-h-dvh transition-all duration-300 pt-20 px-container-padding-mobile md:px-container-padding-desktop">
        {children}
      </main>
    </div>
  );
}
