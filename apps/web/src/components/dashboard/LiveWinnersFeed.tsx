"use client";

import { useEffect, useState } from "react";

interface Winner {
  name: string;
  game: string;
  prize: string;
}

const INITIAL_WINNERS: Winner[] = [
  { name: "User99", game: "Midnight Slots", prize: "500" },
  { name: "ElitePlayer_X", game: "Nautical Roulette", prize: "2,400" },
  { name: "MarinaMaster", game: "Deep Sea Poker", prize: "15,000" },
];

const ROTATION_WINNERS: Winner[] = [
  { name: "OceanKing7", game: "Midnight Slots", prize: "1,200" },
  { name: "HarborGhost", game: "Nautical Roulette", prize: "4,500" },
  { name: "DeepBlue", game: "Blackjack Harbor", prize: "800" },
  { name: "TidalWave", game: "Deep Sea Poker", prize: "22,000" },
];

function WinnerRow({ winner, isNew }: { winner: Winner; isNew: boolean }) {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-surface-container-high/40 rounded-lg transition-all duration-500 ${
        isNew ? "" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary text-sm">
            person
          </span>
        </div>
        <div>
          <p className="font-label-md text-on-surface">{winner.name}</p>
          <p className="text-label-sm text-on-surface-variant">
            ganó en {winner.game}
          </p>
        </div>
      </div>
      <span className="text-secondary font-bold">+{winner.prize} fichas</span>
    </div>
  );
}

export const LiveWinnersFeed = () => {
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextWinner = ROTATION_WINNERS[rotationIndex];
      setWinners((prev) => [nextWinner, ...prev].slice(0, 5));
      setRotationIndex((prev) => (prev + 1) % ROTATION_WINNERS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [rotationIndex]);

  return (
    <section className="lg:col-span-2 glass-card rounded-xl p-6">
      <h3 className="font-title-md text-title-md text-on-surface mb-4">
        Ganadores en vivo
      </h3>
      <div className="space-y-4">
        {winners.map((winner, idx) => (
          <WinnerRow
            key={`${winner.name}-${idx}`}
            winner={winner}
            isNew={idx === 0}
          />
        ))}
      </div>
    </section>
  );
};
