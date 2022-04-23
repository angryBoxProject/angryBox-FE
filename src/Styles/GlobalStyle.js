import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;  
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;
    

  }
  body {
  
    color:white;
    box-sizing: border-box;
    
  }

  button,img{
    cursor:pointer;
  }
`;
export default GlobalStyle;
