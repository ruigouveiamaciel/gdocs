import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../styles/global";
import SideMenu from "../SideMenu";
import { Container, Content } from "./styles";
import { Route, useParams, Switch } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";
import { project, title } from "../../util/parsed";
import FunctionPage from "../../pages/FunctionPage";
import TablePage from "../../pages/TablePage";
import CategoryPage from "../../pages/CategoryPage";
import { dark } from "../../styles/themes/dark";
import { Helmet } from "react-helmet";

const RouteController: React.FC<{}> = () => {
	const { tab, category, subcategory } = useParams();
	const category_object = project[tab]?.subcategories?.[category];
	const exists =
		category_object !== undefined &&
		(!subcategory ||
			("subcategories" in category_object &&
				category_object.subcategories[subcategory] !== undefined));

	if (exists) {
		const item =
			subcategory && "subcategories" in category_object
				? category_object.subcategories[subcategory]
				: category_object;

		if (item.item.startsWith("category")) {
			return <CategoryPage />;
		} else if (item.item.endsWith("table")) {
			return <TablePage />;
		}

		return <FunctionPage />;
	}

	return <NotFoundPage />;
};

const App: React.FC<{}> = () => {
	return (
		<ThemeProvider theme={dark}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<GlobalStyles />
			<Container>
				<SideMenu />
				<Content>
					<Switch>
						<Route
							path="/:tab/:category/:subcategory?"
							component={RouteController}
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</Content>
			</Container>
		</ThemeProvider>
	);
};

export default App;
