import React, { useState } from "react";
import Icon from "@mdi/react";
import { Container, TabsContainer, Tab, MenuContainer } from "./styles";
import { project, icons } from "../../util/parsed";
import Subcategory from "./Subcategory";
import PageLink from "./PageLink";
import clear_label from "../../util/clear_label";
import { useLocation } from "react-router-dom";

const SideMenu: React.FC<{}> = () => {
	const tabs = Object.entries(project);
	const location = useLocation();
	const urlTab = location.pathname.split("/")[1] ?? "";

	const [activeTab, setActiveTab] = useState(
		project[urlTab] ? urlTab : tabs[0][0]
	);
	const [menuOpen, setMenuOpen] = useState(window.innerWidth > 1000);

	function closeMenu() {
		if (window.innerWidth <= 1000) {
			setMenuOpen(false);
		}
	}

	return (
		<Container>
			<TabsContainer>
				{tabs.map(([key, value]) => {
					return (
						<Tab
							key={key}
							empty={
								Object.values(value.subcategories).length === 0
							}
							active={menuOpen && activeTab === key}
							onClick={() => {
								if (activeTab === key) {
									setMenuOpen(!menuOpen);
								} else {
									setActiveTab(key);
									setMenuOpen(true);
								}
							}}
						>
							<Icon path={icons[key] ?? icons["default"]} />
							<span>{value.name}</span>
						</Tab>
					);
				})}
			</TabsContainer>
			<MenuContainer active={menuOpen}>
				{project[activeTab] &&
					Object.values(project[activeTab].subcategories).map((subcategory) => {
						const key = `${activeTab}-${subcategory.name}`;

						if (
							subcategory.item.startsWith("category") &&
							"subcategories" in subcategory
						) {
							const content = Object.values(subcategory.subcategories).map(
								(item) => {
									const label = clear_label(item.name);

									return {
										label: label,
										key: `${key}-${item.name}`,
										link: `/${activeTab}/${subcategory.name}/${item.name}`,
									};
								}
							);

							return (
								<Subcategory
									key={`${key}`}
									link={`/${activeTab}/${subcategory.name}`}
									label={clear_label(subcategory.name)}
								>
									{content.map((item) => (
										<PageLink onClick={closeMenu} {...item} />
									))}
								</Subcategory>
							);
						}

						const label = clear_label(subcategory.name);
						return (
							<PageLink
								key={key}
								link={`/${activeTab}/${subcategory.name}`}
								label={label}
								onClick={closeMenu}
							/>
						);
					})}
			</MenuContainer>
		</Container>
	);
};

export default SideMenu;
