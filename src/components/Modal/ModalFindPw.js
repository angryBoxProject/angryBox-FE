import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tokenURL, URL } from '../../Apis/API';
import ModalLayout from '../../Layouts/ModalLayout';

import { ReactComponent as SaveIcon } from '../../static/image/main/save_icon.svg';
import ModalMakeBank from './ModalMakeBank';

const ModalFindPw = props => {
    const { modalType, close, bankId } = props;
    const [modalmakebank, Setmodalmakebank] = useState(false);
    const [reward, setReward] = useState();
    const [findpw, setFindpw] = useState('');

    const testfindpw = async () => {
        const _ = '';
        await URL.put(`/user/pw?email=${findpw}`, _).then(res => {
            window.alert('임시 비밀번호 발급 성공! 메일을 확인해주세요');
            console.log(res);
            location.reload();
        });
    };

    const getbankreward = async () => {
        await tokenURL.get(`/bank`).then(res => {
            setReward(res.data.data.reward);
        });
    };
    useEffect(() => {
        // getbankreward();
    }, []);
    return (
        <ModalLayout modalType="info" close={close}>
            <TitleArea>
                <Logo onClick={() => {}}>RAGE BANK</Logo>
                <Title>비밀번호 찾기</Title>
            </TitleArea>
            <Content>
                <InputLogin
                    onChange={e => {
                        setFindpw(e.target.value);
                    }}
                    value={findpw}
                    placeholder="찾으실 계정의 이메일을 입력해주세요"
                />
                <Button onClick={testfindpw}>
                    이메일로 임시 비밀번호 전송!
                </Button>

                {/* <Item2>나 지금 완전히 새됐어</Item2> */}
            </Content>
            {/* <NewBankButton
                onClick={() => {
                    // dispatch(CreateDiary({ dispatch, "test" }));
                    Setmodalmakebank(true);
                }}
            >
                <NewBankButtonText>새 적금 만들기</NewBankButtonText>
                <SaveIcon />
            </NewBankButton> */}
        </ModalLayout>
    );
};
const TitleArea = styled.div`
    text-align: center;
    padding-top: 41px;
    padding-bottom: 82px;
`;
const Logo = styled.div`
    font-size: 24px;
    line-height: 29px;
    color: #813bf3;
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
const Button = styled.button`
    width: 100%;
    height: 60px;
    border: solid 3px #813bf3;
    border-radius: 30px;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #813bf3;
    margin: 0 auto;
    display: block;
`;
const InputLogin = styled.input`
    width: 100%;
    height: 60px;
    background: #ececec;
    color: #737373;
    margin-bottom: 18px;
    padding: 15px 20px 16px;
`;
const NewBankButton = styled.button`
    width: 100%;
    max-width: 436px;
    height: 46px;
    border: solid 3px #813bf3;
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
    color: #813bf3;
    margin-right: 10px;
`;

export default ModalFindPw;
