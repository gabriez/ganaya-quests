import Image from "next/image";

export const FeaturedMission = () => {
	return (
		<section className="relative overflow-hidden rounded-xl border border-secondary/30 group">
			{/* Background Image */}
			<Image
				alt="Blackjack Table"
				height={400}
				width={800}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSC7oM947uIZvDHrVhv_MLm2W22WS_o2xWCxRC7byGghsKgL558BQAx6iagOuJcBi-L6qk9cHTG9-k97XcRwzDg_y6ZPsKLGG8CEZJXE8P_CjV5g6qOi7SIBukRc7--tXAs30I-v7s9yQMYGZWUHLf3Z97x39q-UejO_nKUgUF0MHECi3DwiPFLtayaqqfB8-9dyeWE4g1pSvygY-ZPLNFBTBi9ErUQgNXNR6scLU8D8n52ME2GyhmYuVuOfSD972Kod4TAORUe7KC"
			/>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />

			{/* Content */}
			<div className="relative p-8 h-full flex flex-col justify-center max-w-lg">
				<div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/40 px-3 py-1 rounded-full w-fit mb-4">
					<span className="material-symbols-outlined text-sm">bolt</span>
					<span className="font-label-sm uppercase tracking-wider">
						Misión del dia
					</span>
				</div>

				<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
					Gana 3 rondas en JackBlack
				</h2>
				<p className="text-on-surface-variant mb-6 font-body-md text-body-md">
					Test your strategy at the Harbor tables today. Complete this challenge
					before midnight to claim your exclusive rewards.
				</p>

				<div className="flex items-center gap-6">
					<div className="flex flex-col">
						<span className="text-on-surface-variant text-label-sm">
							Premio
						</span>
						<span className="text-secondary font-headline-lg-mobile text-headline-lg-mobile">
							10,000 Fichas
						</span>
					</div>
					<button className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-title-md glow-gold active:scale-95 transition-all cursor-pointer">
						Iniciar Misión
					</button>
				</div>
			</div>
		</section>
	);
};
