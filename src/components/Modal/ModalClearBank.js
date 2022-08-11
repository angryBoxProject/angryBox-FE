import styled from "styled-components";
import ModalLayout from "../../Layouts/ModalLayout";

import { ReactComponent as SaveIcon } from '../../static/image/main/save_icon.svg';

const ModalClearBank = props => {
    const {
        modalType,
        close,
    } = props;

    return (
        <ModalLayout modalType="info" close={close}>
            <TitleArea>
                <Logo onClick={() => {}}>
                    RAGE BANK
                </Logo>
                <Title>분노 적금 깨기 완료!</Title>
            </TitleArea>
            <Content>
                <Item1>오늘 저녁은 치킨이닭!</Item1>
                <Item2>나 지금 완전히 새됐어</Item2>
            </Content>
            <NewBankButton
                onClick={() => {
                    // dispatch(CreateDiary({ dispatch, "test" }));
                    SetmodalmakePost(true);
                }}
            >
                <NewBankButtonText>새 적금 만들기</NewBankButtonText>
                <SaveIcon />
            </NewBankButton>
        </ModalLayout>
    )
}
const TitleArea = styled.div`
    text-align: center;
    padding-top: 41px;
    padding-bottom: 82px;
`
const Logo = styled.div`
    font-size: 24px;
    line-height: 29px;
    color: #813BF3;
    font-family: 'Montserrat-ExtraBold';
    font-style: normal;
`;
const Title = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
`;
const Content = styled.div`
    text-align: center;
    padding-bottom: 143px;
`;
const Item1 = styled.div`
    font-weight: 700;
    font-size: 52px;
    line-height: 75px;
    color: #282828;
    margin-bottom: 12px;
`;
const Item2 = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
`;
const NewBankButton = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #813BF3;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;
const NewBankButtonText = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #813BF3;
    margin-right: 10px;
`;

export default ModalClearBank;