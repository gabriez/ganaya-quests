"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: { href: string; icon: string; label: string; isActive?: boolean }[] = [
	{ href: "/dashboard", icon: "home", label: "Home" },
	{ href: "/dashboard", icon: "assignment", label: "Misiones", isActive: true },
	{ href: "#", icon: "military_tech", label: "Premios" },
	{ href: "#", icon: "person", label: "Perfil" },
];

export const BottomNav = () => {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-surface-container-high backdrop-blur-md neon-shadow rounded-t-xl flex justify-around items-center py-2 px-4 pb-safe">
			{navItems.map((item) => {
				const isActive = item.isActive || pathname === item.href;
				return (
					<Link
						key={item.label}
						href={item.href}
						className={`flex flex-col items-center justify-center transition-all duration-150 active-scale ${
							isActive
								? "bg-secondary-container text-on-secondary-container rounded-full px-4 py-1"
								: "text-on-surface-variant hover:text-primary"
						}`}>
						<span
							className="material-symbols-outlined"
							style={isActive ? { fontVariationSettings: "'FILL' 1" as string } : undefined}>
							{item.icon}
						</span>
						<span className="font-label-sm text-label-sm">{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
};
