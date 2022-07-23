import { style } from "@mui/system";
import styled from "styled-components";

const TitleWrap = props => {
    const {
        title,
        children,
    } = props;

    return (
        <ElTitleWrap>
            <Title>
                {title}
            </Title>
            {children &&
                <Function>
                    {children}
                </Function>
            }
        </ElTitleWrap>
    )
}
const ElTitleWrap = styled.div`
    width: 100%;
    padding: 20px 5vw 40px 0;
    display: flex;
    align-items: center;
`;
const Title = styled.h1`
    height: 50px;
    display: flex;
    align-items: center;
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    color: #F6F6F6;
`;
const Function = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export default TitleWrap;