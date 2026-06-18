import Image from "next/image";

interface GameCardProps {
	title: string;
	imageUrl: string;
	alt: string;
}

export const GameCard = ({ title, imageUrl, alt }: GameCardProps) => {
	return (
		<div className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-outline-variant/10 shadow-lg cursor-pointer">
			<Image
				height={400}
				width={300}
				alt={alt}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
				src={imageUrl}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90" />
			<div className="absolute inset-0 flex flex-col justify-end p-4">
				<h3 className="font-title-md text-title-md text-on-surface">{title}</h3>
				<button className="mt-3 bg-primary text-on-primary font-label-md py-2 rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
					Juega Ahora
				</button>
			</div>
		</div>
	);
};
