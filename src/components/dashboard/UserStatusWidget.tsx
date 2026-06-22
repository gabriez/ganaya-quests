export const UserStatusWidget = () => {
  return (
    <section className="glass-card rounded-xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-on-surface-variant font-label-sm uppercase tracking-widest">
              Nivel actual
            </h3>
            <p className="font-headline-lg-mobile text-headline-lg-mobile text-secondary">
              Elite I
            </p>
          </div>
          <div className="bg-secondary/10 pt-2 px-1 rounded-lg">
            <span
              className="material-symbols-outlined text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-label-sm">
            <span className="text-on-surface-variant">XP Progress</span>
            <span className="text-primary">8,450 / 10,000</span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container glow-primary-sm transition-all duration-1000"
              style={{ width: "84.5%" }}
            />
          </div>
          <p className="text-label-sm text-on-surface-variant/60 italic">
            1,550 XP para Elite II
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-outline-variant/10 flex justify-between items-center">
        <button
          type="button"
          className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Historial
        </button>
      </div>
    </section>
  );
};
