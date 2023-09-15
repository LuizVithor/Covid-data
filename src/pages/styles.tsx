import { styled } from "styled-components"

export const ContainerStyled = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    background-color: white;
    justify-content: flex-start;
    box-shadow: 0px 0px 10px 2px rgba(204,204,204,1);
    -moz-box-shadow: 0px 0px 10px 2px rgba(204,204,204,1);
    -webkit-box-shadow: 0px 0px 10px 2px rgba(204,204,204,1);

    .MuiInputBase-root {
        height: 40px;
    }
`