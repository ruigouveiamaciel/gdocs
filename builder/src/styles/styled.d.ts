import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			main: string;
			background: (elevation: number) => string;
		};
		text: {
			background: {
				high: string,
				medium: string,
				disabled: string,
				hover: string
			}
		};
		sideMenu: {
			background: string;
			active: string;
			text: string;
			hover: string;
		};
	}
}
