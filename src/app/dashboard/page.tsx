"use client";

import Link from "next/link";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNav } from "@/components/BottomNav";

const missions = [
	{
		id: "instagram",
		name: "Seguir en Instagram",
		reward: "500 fichas",
		icon: "camera",
		color: "#E1306C",
		href: "/missions/instagram",
	},
	{
		id: "telegram",
		name: "Unirse al Telegram",
		reward: "750 fichas",
		icon: "send",
		color: "#0088cc",
		href: "/missions/telegram",
	},
	{
		id: "whatsapp",
		name: "Compartir en WhatsApp",
		reward: "300 fichas",
		icon: "chat",
		color: "#25D366",
		href: "/missions/whatsapp",
	},
	{
		id: "twitter",
		name: "Seguir en Twitter/X",
		reward: "400 fichas",
		icon: "x",
		color: "#1da1f2",
		href: "/missions/twitter",
	},
] as const;

export default function DashboardPage() {
	return (
		<div className="min-h-dvh bg-background">
			<TopAppBar />

			{/* Ambient glows */}
			<div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
			<div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

			<main className="pt-20 pb-28 md:pb-12 px-container-padding-mobile md:px-container-padding-desktop">
				<div className="max-w-7xl mx-auto space-y-stack-md md:space-y-stack-lg">
					{/* Greeting & Balance Section */}
					<section className="flex flex-col gap-4 md:flex-row md:items-start md:gap-gutter">
						{/* Greeting */}
						<div className="md:flex-1">
							<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
								¡Hola, Agus! 👋
							</h1>
							<p className="font-body-md text-on-surface-variant mt-1">
								¿Qué misión vas a completar hoy?
							</p>
						</div>

						{/* Balance Card */}
						<div className="glass-card rounded-xl p-4 md:p-5 flex justify-between items-center glow-primary-sm md:min-w-80">
							<div className="flex flex-col">
								<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
									Tu Balance
								</span>
								<div className="flex items-center gap-2">
									<span
										className="material-symbols-outlined text-secondary"
										style={{ fontVariationSettings: "'FILL' 1" }}>
										monetization_on
									</span>
									<span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold">
										15.400 fichas
									</span>
								</div>
							</div>
							<button className="bg-primary-container text-on-primary-container rounded-full px-4 py-2 font-label-md text-label-md active-scale whitespace-nowrap">
								Canjear
							</button>
						</div>
					</section>

					{/* Desktop 2-column layout for bonus + missions */}
					<div className="md:grid md:grid-cols-3 md:gap-gutter">
						{/* Weekly Bonus — spans 1 column on desktop */}
						<section className="md:col-span-1 space-y-3 mb-stack-md md:mb-0">
							<div className="flex justify-between items-end">
								<h2 className="font-title-md text-title-md text-on-surface">Bono Semanal</h2>
								<span className="font-label-sm text-label-sm text-primary">Termina en 2d 4h</span>
							</div>
							<div className="relative overflow-hidden glass-card rounded-xl p-5 border-l-4 border-secondary">
								<div className="flex justify-between items-start mb-4">
									<div className="space-y-1">
										<h3 className="font-title-md text-title-md text-secondary font-bold">
											Cofre Épico
										</h3>
										<p className="font-body-md text-body-md text-on-surface-variant">
											Completá 10 misiones más para desbloquear.
										</p>
									</div>
									<div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center glow-gold-sm shrink-0">
										<span
											className="material-symbols-outlined text-on-secondary-container text-3xl"
											style={{ fontVariationSettings: "'FILL' 1" }}>
											featured_seasonal_and_gifts
										</span>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between font-label-sm text-label-sm">
										<span className="text-on-surface">Progreso: 15/25</span>
										<span className="text-secondary">60%</span>
									</div>
									<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
										<div
											className="h-full bg-secondary rounded-full glow-gold-sm transition-all duration-1000"
											style={{ width: "60%" }}
										/>
									</div>
								</div>
							</div>
						</section>

						{/* Daily Missions — spans 2 columns on desktop */}
						<section className="md:col-span-2 space-y-4">
							<h2 className="font-title-md text-title-md text-on-surface">Misiones de Hoy</h2>
							<div className="space-y-stack-sm md:grid md:grid-cols-2 md:gap-stack-sm md:space-y-0">
								{missions.map((mission) => (
									<Link
										key={mission.id}
										href={mission.href}
										className="glass-card rounded-xl p-4 flex items-center gap-4 active:bg-surface-variant transition-colors group hover:bg-surface-container-high">
										<div
											className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border"
											style={{
												backgroundColor: `${mission.color}20`,
												borderColor: `${mission.color}30`,
											}}>
											<span
												className="material-symbols-outlined"
												style={{ color: mission.color }}>
												{mission.icon}
											</span>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="font-label-md text-label-md text-on-surface truncate">
												{mission.name}
											</h4>
											<div className="flex items-center gap-1 text-secondary">
												<span className="material-symbols-outlined text-sm">stars</span>
												<span className="font-label-sm text-label-sm">{mission.reward}</span>
											</div>
										</div>
										<div className="bg-secondary text-on-secondary font-label-md text-label-md px-5 py-2 rounded-lg font-bold shadow-md active-scale whitespace-nowrap">
											Hacer
										</div>
									</Link>
								))}
							</div>
						</section>
					</div>

					{/* Asymmetric Promotional Banner (desktop only enhancement) */}
					<section className="hidden md:block">
						<div className="glass-card rounded-xl p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center glow-gold-sm">
									<span
										className="material-symbols-outlined text-on-secondary-container text-3xl"
										style={{ fontVariationSettings: "'FILL' 1" }}>
										emoji_events
									</span>
								</div>
								<div>
									<h3 className="font-title-md text-title-md text-secondary font-bold">
										¡Desafío Semanal!
									</h3>
									<p className="font-body-md text-body-md text-on-surface-variant">
										Completá 3 misiones de redes sociales y ganá un bonus extra de 2.000 fichas.
									</p>
								</div>
							</div>
							<button className="bg-secondary text-on-secondary font-label-md px-6 py-3 rounded-full font-bold shadow-md active-scale whitespace-nowrap">
								Participar
							</button>
						</div>
					</section>
				</div>
			</main>

			<BottomNav />
		</div>
	);
}
