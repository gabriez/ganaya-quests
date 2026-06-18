import { FeaturedMission } from "@/components/dashboard/FeaturedMission";
import { GamesSection } from "@/components/dashboard/games/GamesSection";
import { LiveWinnersFeed } from "@/components/dashboard/LiveWinnersFeed";
import { UserStatusWidget } from "@/components/dashboard/UserStatusWidget";

export default function DashboardPage() {
	return (
		<div className="max-w-[1280px] mx-auto space-y-stack-md">
			{/* User Status & Featured Mission */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
				<div className="lg:col-span-4">
					<UserStatusWidget />
				</div>
				<div className="lg:col-span-8 min-h-[260px]">
					<FeaturedMission />
				</div>
			</div>

			{/* Quick Access Games */}
			<GamesSection />

			{/* Live Winners & Harbor Trends */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
				<LiveWinnersFeed />

				<section className="glass-card rounded-xl p-6">
					<h3 className="font-title-md text-title-md text-on-surface mb-4">
						Juegos en Tendencia
					</h3>
					<div className="space-y-6">
						<div className="flex items-center gap-4">
							<div>
								<p className="font-label-md text-on-surface">
									Blackjack Popularity
								</p>
								<p className="text-label-sm text-on-surface-variant">
									+24% this week
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
