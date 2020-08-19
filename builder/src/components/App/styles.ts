import styled from "styled-components"

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    display: flex;
`

export const Content = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: scroll;

    > * {
        min-height: 100%;
    }
`