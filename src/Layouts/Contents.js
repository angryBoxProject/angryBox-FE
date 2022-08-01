import styled from "styled-components";

import Header from './Header';

const Contents = props => {
    const {
        header = true,
        children,
    } = props;

    return (
        <ContentsWrap style={ header ? {backgroundColor: "#fff"} : {backgroundColor: "#F6F6F6"} }>
            {header && <Header />}
            <ContentsInner>
                {children}
            </ContentsInner>
        </ContentsWrap>
    )
}
const ContentsWrap = styled.div`
    width: 100%;
    height: 100vh;
`;
const ContentsInner = styled.div`
    width: 100%;
    max-width: 1024px;
    padding: 0 20px;
    margin: 0 auto;
`
export default Contents;