import { IconsProps } from "./iconsProps";
import { JSX } from "react";

export type SidebarLinkType = {
	path: string;
	icon: (props: IconsProps) => JSX.Element;
	text: string;
};
