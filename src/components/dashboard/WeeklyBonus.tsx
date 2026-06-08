export const WeeklyBonus = () => {
	return (
		<section className="md:col-span-1 space-y-3 mb-stack-md md:mb-0">
			<div className="flex justify-between items-end">
				<h2 className="font-title-md text-title-md text-on-surface">
					Bono Semanal
				</h2>
				<span className="font-label-sm text-label-sm text-primary">
					Termina en 2d 4h
				</span>
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
	);
};
