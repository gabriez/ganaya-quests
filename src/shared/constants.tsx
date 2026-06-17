import { Home } from "../icons/Home";
import { Ranking } from "../icons/Ranking";
import { RocketLaunch } from "../icons/RocketLaunch";
import { SidebarLinkType } from "../types";
import { IconsProps } from "../types/iconsProps";

export const AUTH_TOKEN = "authToken";

export const ROUTES = {
	LOGIN: "/",
	DASHBOARD: "/dashboard",
	MISSIONS: "/dashboard/missions",
	RANKING: "/dashboard/ranking",
};

export const ADMIN_TOKEN = "adminToken";

export const PUBLIC_LINKS: SidebarLinkType[] = [
	{
		path: ROUTES.DASHBOARD,
		icon: (props: IconsProps) => <Home {...props} />,
		text: "Inicio",
	},
	{
		path: ROUTES.MISSIONS,
		icon: (props: IconsProps) => <RocketLaunch {...props} />,
		text: "Misiones",
	},
	{
		path: ROUTES.RANKING,
		icon: (props: IconsProps) => <Ranking {...props} />,
		text: "Ranking",
	},
];
