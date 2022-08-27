import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;  
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;
    

  }
  body {
  
    color:#282828;
    box-sizing: border-box;
    background: #F6F6F6;
    
  }

  button,img{
    cursor:pointer;
  }

`;
export default GlobalStyle;
