import { GameCard } from "./GameCard";

const GAMES = [
  {
    title: "Midnight Slots",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAWMpaIeCVh-NuniELi-p1JSyNHS-doWaZYRDNlIUHObxmKAt1PNNz2h8y4sB1S8ZIB2Oud5DZbymM8y_PYd-kIh00339IlrL_1zgVRrTJssnrCRLcNWUA22JeaMRbbUiH4t2Vdk7UThKro5PEIX3k4u28G4x91l64ksfwNjeh1oUDoBFGrGQt4lmLsAoUruVGoxMr-agHF-WYP7fY7MWMpZHf54mOpK7_ehtl9enrZf2N_C-3ecP5VOGgJ1-VjJPVugl0TaPkYAES",
    alt: "A vibrant slot machine with nautical icons",
  },
  {
    title: "Nautical Roulette",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2U-QteezK4BQ6uV657KeKXtZVWRmVkcoMs8e4N10W3p6tfgHLovJhcHr_oLQHF5y0gBKnk-hLwAxPJvBHG-r9HHNbvJEA5LT_XwNd_cXZ78dkoH_DnwrP3OjbTz-XXvN1B8PrJf9060Swi-HdPVGG-jdzHIX0FUxJ_HG5wODiuY1xzdJ4n-PgH6H4q9H0mhcwbKWiyJHs6shTxe72aNOtliy9n9AB1qK0_HmKMKNsfa8BFQcnS9m_ICnGjKX-9vwWyKLHW4mTenqc",
    alt: "High-end roulette wheel with gold accents",
  },
  {
    title: "Blackjack Harbor",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX2cJbGzNF9jDdABZhs7cPnAkrDD-sG1gTlXiWjpezTiiSyaN0Fkmo-AzDLHJdJnMLk-4jYCSlijHvNqhwFTshkUzhkXuCV4ZB-BkK8oovwynHg4kmRTcdlfjl32c3u9ZNkOkRV_KJaiOpVzKRzRDCUz4ZfoTx92xjkAvRXDWakyj-nelnz3NYLzfXA-zQ9nlYcnYm1a8vk3flZO8sFdipd23MCfwTWGGa4xDvivmlF-5WZUwcgTHMPdRfLD9YUS23QS_KCMdfUOwC",
    alt: "Classic blackjack cards and chips on navy felt",
  },
  {
    title: "Deep Sea Poker",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQx2Mp44plPAiopDRzV_TXgKtR1zwJg-KrHsCnS_-DyxJwOFMKRwG3o8p2wuDoBLUa-fyYwzP4kRxHx25zl7g2Et6MiieB0DryUQLhkohZf5JeMjYs8NjLNJobNjv5vJ75T1gmSRdGk352kKvDiftJgiZnVxS5lMiCLnmX-uMgoaK5Izr3GH165pAxMUwJXmOTJm4k3PUztMgw66WcIDv9_JCfQ5YKES8YYLZSOmYZnT1oeM6XBx-4Ror4PWwn5XrY2SAdcK79k2D",
    alt: "Dramatic poker scene with chips and royal flush",
  },
];

export const GamesSection = () => {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Acceso Rápido
          </h2>
          <p className="text-on-surface-variant font-label-md">
            Ve rápido a tus juegos favoritos
          </p>
        </div>
        <a
          href="/"
          className="text-primary font-label-md flex items-center gap-1 hover:scale-105 transition duration-300 cursor-pointer"
        >
          Mira todos los juegos
          <span className="material-symbols-outlined">chevron_right</span>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {GAMES.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            imageUrl={game.imageUrl}
            alt={game.alt}
          />
        ))}
      </div>
    </section>
  );
};
