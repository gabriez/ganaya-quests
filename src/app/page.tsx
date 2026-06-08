"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push("/dashboard");
	};

	return (
		<div className="relative flex flex-1 flex-col items-center justify-center min-h-dvh px-container-padding-mobile md:px-container-padding-desktop py-stack-lg overflow-hidden">
			{/* Background Decorative Elements */}
			<div className="fixed top-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
			<div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
			<div className="hidden md:block fixed top-1/3 left-1/4 w-48 h-48 bg-tertiary/5 rounded-full blur-[80px] pointer-events-none" />

			{/* Desktop decorative gradient bar */}
			<div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 blur-sm" />

			<main className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
				{/* Header */}
				<header className="w-full mb-stack-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high shadow-lg shadow-primary/10 mb-stack-md border border-white/5">
						<span
							className="material-symbols-outlined text-secondary text-5xl"
							style={{ fontVariationSettings: "'FILL' 1" }}>
							casino
						</span>
					</div>
					<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
						¡Bienvenido!
					</h1>
					<p className="font-body-md text-on-surface-variant mt-2">
						Iniciá sesión para seguir con tus misiones
					</p>
				</header>

				{/* Login Form */}
				<section className="w-full">
					<form
						onSubmit={handleSubmit}
						className="space-y-stack-md glass-card rounded-xl p-6 md:p-8 shadow-2xl">
						{/* Username */}
						<div className="floating-label-input">
							<input
								id="username"
								type="text"
								placeholder=" "
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
							/>
							<label
								htmlFor="username"
								className="floating-label font-label-md text-outline">
								Usuario o Correo
							</label>
						</div>

						{/* Password */}
						<div className="floating-label-input">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder=" "
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12"
							/>
							<label
								htmlFor="password"
								className="floating-label font-label-md text-outline">
								Contraseña
							</label>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-4 text-outline hover:text-primary transition-colors">
								<span className="material-symbols-outlined">
									{showPassword ? "visibility_off" : "visibility"}
								</span>
							</button>
						</div>

						{/* Forgot Password */}
						<div className="flex justify-end">
							<a
								href="#"
								className="font-label-sm text-primary hover:opacity-80 transition-opacity"
								onClick={(e) => e.preventDefault()}>
								¿Olvidaste tu contraseña?
							</a>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full bg-secondary text-on-secondary font-label-md py-4 rounded-full shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all font-bold">
							Iniciar Sesión
						</button>
					</form>
				</section>

				{/* Register Link */}
				<footer className="mt-auto py-stack-md w-full text-center">
					<p className="font-body-md text-on-surface-variant">
						¿No tenés cuenta?{" "}
						<a
							href="#"
							className="text-primary font-label-md ml-1 hover:underline underline-offset-4"
							onClick={(e) => e.preventDefault()}>
							Registrate
						</a>
					</p>
				</footer>
			</main>
		</div>
	);
}
