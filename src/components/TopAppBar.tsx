"use client";

export const TopAppBar = () => {
	return (
		<header className="fixed top-0 w-full z-50 bg-surface-container border-b border-outline-variant flex items-center justify-between px-container-padding-mobile md:px-container-padding-desktop h-16">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden flex items-center justify-center border border-outline-variant">
					<img
						alt="User Profile"
						className="w-full h-full object-cover"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8hM-6HrYibIqyzkCNgeaR05_yrCaP-yr4fKPB72nT7Q0DcF3oe3GaUlzUEM27rolQZZ3gQTMWKNsSs9cFT5e1bafbATV-s4SDR2J2TCMlckRkIOSJxCtc3xL_2BAQaCYjeYoablOUP42167imWxrMexF6FALqXxiy79177VUu_8tu4eviQGg5JSzc9ObfVYjDvtX7vBRpc_HcjX9E3ot3s5CI9F8jUyotv1ygQTsvpvB1E2wJBOf2Xr3gk1__fzBRnWRgCx3CS3Ev"
					/>
				</div>
				<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
					LuckyBet Premios
				</h1>
			</div>
			<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors active-scale">
				<span className="material-symbols-outlined text-primary">notifications</span>
			</button>
		</header>
	);
};
