import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			main: string;
			background: (elevation: number) => string;
		};
		sideMenu: {
			background: string;
			active: string;
			text: string;
			hover: string;
		};
	}
}
