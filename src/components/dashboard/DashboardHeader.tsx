export const DashboardHeader = () => {
	return (
		<section className="flex flex-col gap-4 md:flex-row md:items-center md:gap-gutter">
			{/* Greeting */}
			<div className="md:flex-1">
				<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
					¡Hola, Agus! 👋
				</h1>
				<p className="font-body-md text-on-surface-variant mt-1">
					¿Qué misión vas a completar hoy?
				</p>
			</div>
		</section>
	);
};
