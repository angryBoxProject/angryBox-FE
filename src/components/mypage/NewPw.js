import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { tokenURL } from '../../Apis/API';
import { Button, FlexDiv, Input2 } from '../../elements';

const NewPw = props => {
    const [pw, setPw] = useState('');
    const [newpw, setNewPw] = useState('');
    const [newpwcheck, setNewPwCheck] = useState('');

    const ChagePwMutation = useMutation(Data => {
        tokenURL
            .put(`users`, Data)
            .then(res => {
                window.alert('비밀번호 변경 성공!');
                console.log(res);
                location.reload();
            })
            .catch(error => {
                console.log(error.response);
                window.alert(error.response.data.error);
            });
    });
    const handleChagePw = () => {
        const data = {
            password: pw,
            newPassword: newpw,
            checkNewPassword: newpwcheck,
        };
        ChagePwMutation.mutate(data);
    };
    return (
        <>
            <Warp>
                <FlexDiv column={true} justify="space-around">
                    <TitleArea justify="space-between">
                        <Subtitle>비밀번호 변경</Subtitle>
                        <EditButton width="104px" onClick={handleChagePw}>
                            Edit
                        </EditButton>
                    </TitleArea>
                    <Table>
                        <Text>기존비밀번호</Text>
                        <Inputtable
                            type="password"
                            placeholder="기존 비밀번호를 입력해주세요"
                            onChange={e => setPw(e.target.value)}
                        ></Inputtable>
                    </Table>
                    <Table>
                        <Text>새 비밀번호</Text>
                        <Inputtable
                            type="password"
                            placeholder="변경할 비밀번호를 입력해주세요"
                            onChange={e => setNewPw(e.target.value)}
                        ></Inputtable>
                    </Table>
                    <Table>
                        <Text>새 비밀번호 확인</Text>
                        <Inputtable
                            type="password"
                            placeholder="변경할 비밀번호를 다시 입력해주세요"
                            onChange={e => setNewPwCheck(e.target.value)}
                        ></Inputtable>
                    </Table>
                </FlexDiv>
            </Warp>
        </>
    );
};

const Warp = styled.div`
    height: 603px;
    width: 100%;
    background-color: #ececec;
    padding: 39px 48px 33.25px;
    margin-top: 50px;
`;
const TitleArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 33px;
    border-bottom: solid 1px #737373;
    margin-bottom: 50.5px;
`;
const Subtitle = styled.div`
    font-weight: 700;
    font-size: 23px;
    line-height: 33px;
    color: #737373;
`;
const EditButton = styled.button`
    width: 128px;
    height: 44px;
    background: #813bf3;
    border-radius: 4px;
    color: #f6f6f6;
`;
const Table = styled.div``;
const Text = styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    color: #737373;
    padding-bottom: 27.5px;
`;
const Inputtable = styled.input`
    width: 100%;
    height: 47px;
    background: #ececec;
    border: solid #737373 1px;
    border-radius: 4px;
    padding: 15px 19px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #737373;
    margin-bottom: 50.5px;

    &:focus {
        background: #fff;
    }
`;
export default NewPw;
