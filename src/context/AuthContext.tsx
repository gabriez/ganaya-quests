"use client";
import { AUTH_TOKEN, ROUTES } from "@/constants";
import { AuthContextType, UserType } from "@/types/authContext";
import { jwtDecode } from "@/utils/decodeJWT";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
	authToken: null,
	user: null,
	logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authToken, setAuthToken] = useState<string | null>(null);
	const [user, setUser] = useState<UserType | null>(null);

	const navigation = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const token = localStorage.getItem(AUTH_TOKEN);
		if (token) {
			setAuthToken(token);

			try {
				const decodedUser = jwtDecode<UserType>(token);
				setUser(decodedUser);
			} catch (error) {
				console.error("Error decoding token:", error);
				setAuthToken(null);
				setUser(null);
			}
		}
	}, []);

	useEffect(() => {
		const time = new Date().getTime() / 1000;

		if (user) {
			if (user.exp && user.exp < time) {
				setAuthToken(null);
				setUser(null);
				localStorage.removeItem(AUTH_TOKEN);
				navigation.push(ROUTES.LOGIN);
				return;
			}

			if (pathname === ROUTES.LOGIN) {
				navigation.push(ROUTES.DASHBOARD);
				return;
			}
		}

		if (pathname !== ROUTES.LOGIN && !user) {
			navigation.push(ROUTES.LOGIN);
			return;
		}
	}, [pathname]);

	const logout = () => {
		setAuthToken(null);
		setUser(null);
		localStorage.removeItem(AUTH_TOKEN);
		navigation.push(ROUTES.LOGIN);
	};

	return (
		<AuthContext.Provider
			value={{
				authToken,
				user,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
