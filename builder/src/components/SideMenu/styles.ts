import styled from "styled-components";

export const Container = styled.menu`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: center;
	box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.2),
		0px 0px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
	position: relative;
`;

export const TabsContainer = styled.div`
	width: 6.4rem;
	background: ${({ theme }) => theme.sideMenu.background};
	color: ${({ theme }) => theme.sideMenu.text};
	overflow-y: auto;
	overflow-x: hidden;
	scrollbar-width: none;
`;

export interface TabProps {
	active?: boolean;
	empty?: boolean;
}

export const Tab = styled.div<TabProps>`
	cursor: pointer;
	height: 6.5rem;
	display: ${({ empty }) => empty ? "none" : "flex"};
	align-items: center;
	justify-content: center;
	flex-direction: column;
	transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
	border-bottom: 0.1rem solid ${({ theme }) => theme.sideMenu.hover};
	background: ${({ theme, active }) =>
		active ? theme.sideMenu.active : "none"};

	:hover {
		background: ${({ theme }) => theme.sideMenu.hover};
	}

	svg {
		width: 2.4rem;
		height: 2.4rem;
		margin-bottom: 0.4rem;
	}

	span {
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 1.2rem;
		user-select: none;
	}
`;

interface MenuContainerProps {
	active?: boolean;
}

export const MenuContainer = styled.div<MenuContainerProps>`
	width: 25.6rem;
	max-width: ${({ active }) => (active ? "25.6rem" : "0")};
	overflow-x: hidden;
	transition: max-width 250ms cubic-bezier(0.4, 0, 0.2, 1);
	padding-top: 0.4rem;
	background: ${({ theme }) => theme.colors.background(4)};
	scrollbar-width: thin;

	@media (max-width: 1000px) {
		position: absolute;
		left: 6.4rem;
		height: 100%;
		box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.2),
			0px 0px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
	}

	@media (max-width: 400px) {
		width: calc(90vw - 6.4rem);
	}

	> * {
		width: 25.6rem;
	}

	> a:first-child {
		display: inline-block;
		margin-top: 0.4rem;
	}

	> a > div {
		padding-left: 2rem;
	}
`;
