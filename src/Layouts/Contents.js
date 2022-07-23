import styled from "styled-components";
import theme from "../Styles/theme";

import Header from './Header';

const Contents = props => {
    const {
        header = true,
        children,
    } = props;

    return (
        <ContentsWrap>
            {header && <Header />}
            {children}
        </ContentsWrap>
    )
}
const ContentsWrap = styled.div`
    background-color: ${theme.color.black};
    width: 100%;
    height: 100vh;
`;
export default Contents;