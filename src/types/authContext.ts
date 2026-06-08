import { JwtPayload } from "@/utils/decodeJWT";

export interface AuthContextType {
	authToken: string | null;
	user: UserType | null;
	logout: () => void;
}

export interface UserType extends JwtPayload {
	username: string;
	rol: string;
	id: number;
}
