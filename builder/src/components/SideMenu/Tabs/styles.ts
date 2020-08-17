import styled from "styled-components"

export const Container = styled.div`
    width: 6.4rem;
    background: ${({ theme }) => theme.sideMenu.background};
    color: ${({ theme }) => theme.sideMenu.text};
    overflow-y: auto;
    overflow-x: hidden;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
    ::-webkit-scrollbar {      /* Chrome, Safari and Opera */
        display: none;
    }
`
export const Tab = styled.div`
    cursor: pointer;
    height: 6.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);

    :hover {
        background: ${({ theme }) => theme.sideMenu.hover};
    }

    svg {
        width: 2.4rem;
        height: 2.4rem;
        margin-bottom: 0.4rem;
    }

    span {
        font-weight: medium;
        font-size: 1.2rem;
        line-height: 1.2rem;
        user-select: none;
    }
`