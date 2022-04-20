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
                console.log(res);
                window.alert('변경성공');
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
                    <FlexDiv justify="space-between">
                        <Subtitle>비밀번호 변경</Subtitle>
                        <Button width="104px" onClick={handleChagePw}>
                            Edit
                        </Button>
                    </FlexDiv>
                    <div style={{ paddingTop: '34px' }}>
                        <hr />
                    </div>
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
    height: 705px;
    width: 100%;
    background-color: #2e2e2e;
    border-radius: 20px;
    padding: 36px;
`;
const Subtitle = styled.div`
    font-weight: 700;
    font-size: 23px;
    line-height: 31px;
`;
const Table = styled.div`
    padding: 36px 0px;
`;
const Text = styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    padding: 15px 0px;
`;
const Inputtable = styled.input`
    width: 100%;
    height: 47px;
    background-color: #2e2e2e;
    border: solid white 1px;
    border-radius: 4px;
    padding: 15px 0px;
    color: white;

    & {
        padding: 0px 19px;
    }
`;
export default NewPw;
