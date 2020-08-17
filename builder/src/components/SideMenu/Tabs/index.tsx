import React from "react";
import { Container, Tab } from "./styles";
import { tabs, TabInfo } from "../../../util/parsed";
import Icon from "@mdi/react";
import * as mdiIcons from "@mdi/js";

const defaultIcons: {
	[key: string]: string;
} = {
	globals: mdiIcons.mdiCodeBraces,
	classes: mdiIcons.mdiBook,
	libraries: mdiIcons.mdiBookshelf,
	hooks: mdiIcons.mdiHook,
	panels: mdiIcons.mdiViewQuilt,
	enums: mdiIcons.mdiFormatListNumbered,
	structs: mdiIcons.mdiDatabase,
	default: mdiIcons.mdiCursorDefault,
};

const Tabs: React.FC<{}> = () => {
	return (
		<Container>
			{tabs.map((tab: TabInfo) => (
				<Tab>
					<Icon path={defaultIcons[tab.key] ?? defaultIcons["default"]} />{" "}
					<span>{tab.label}</span>
				</Tab>
			))}
		</Container>
	);
};

export default Tabs;
