import { createGlobalStyle } from 'styled-components'
import Roboto from "../assets/fonts/Roboto-Regular.ttf";

export const GlobalStyle = createGlobalStyle`

&::-webkit-scrollbar {
        width: 7px;
        position: absolute;
        border-radius: 80px;
        height: 7px;
      }

  &::-webkit-scrollbar-thumb {
    background: #195381;
    border-radius: 50px;
  }

  @font-face {
    font-style: normal;
    font-weight: normal;
    font-family: 'Roboto';
    src: url(${Roboto}) format('ttf');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    height: 100vh;
    overflow: auto;
    font-weight: 400;
    font-size: 1.6rem;
    font-family: 'Caveat', cursive;
    font-family: 'Roboto', sans-serif;
    -webkit-tap-highlight-color: transparent !important;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`