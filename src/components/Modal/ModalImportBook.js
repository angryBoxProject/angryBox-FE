import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useBanks } from '../../hooks/useBanks';

const ModalImportBook = props => {
    const {
        open,
        close,
        width,
        height,
        title,
        subtitle,
        contents,
        _onChange,
        listclick,
    } = props;
    const [select, setSelect] = useState(false);
    const [selectbankId, setSelectbankId] = useState();
    const { status, data: bankList, error, isFetching, refetch } = useBanks();
    const bankslist = bankList.coinBankList;
    return (
        <>
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <Section>
                        <MainModal width={width} height={height}>
                            <ModalPopup>
                                <FlexDiv justify="space-between" padding="10px">
                                    <FlexDiv>
                                        <ModalTitle>{title}</ModalTitle>
                                        <ModalSubTitle>
                                            {subtitle}
                                        </ModalSubTitle>
                                    </FlexDiv>
                                    <CloseButton onClick={close} />
                                </FlexDiv>
                                <FlexDiv justify="space-between" padding="10px">
                                    <ModalTextNo select={true}>No</ModalTextNo>
                                    <ModalTextBankName select={true}>
                                        적금명
                                    </ModalTextBankName>
                                    <ModalTextBankdes select={true}>
                                        세부 설명
                                    </ModalTextBankdes>
                                    <ModalTextBankTime select={true}>
                                        설계일
                                    </ModalTextBankTime>
                                </FlexDiv>
                                <hr />
                                {bankslist.map((data, index) => (
                                    <FlexDiv
                                        justify="space-between"
                                        padding="10px"
                                        onClick={() => {
                                            setSelect(!select);
                                            if (
                                                selectbankId === data.coinBankId
                                            )
                                                setSelectbankId(null);
                                            else if (
                                                selectbankId !== data.coinBankId
                                            )
                                                setSelectbankId(
                                                    data.coinBankId,
                                                );
                                            console.log(selectbankId);
                                        }}
                                    >
                                        <ModalTextNo select={select}>
                                            {data.coinBankId}
                                        </ModalTextNo>
                                        <ModalTextBankName select={select}>
                                            {data.coinBankName}
                                        </ModalTextBankName>
                                        <ModalTextBankdes select={select}>
                                            {data.coinBankName}
                                        </ModalTextBankdes>
                                        <ModalTextBankTime select={select}>
                                            {data.bankAccount}
                                        </ModalTextBankTime>
                                    </FlexDiv>
                                ))}

                                <ModalText></ModalText>
                                <ModalButton>
                                    <Button
                                        is_disabled={selectbankId}
                                        onClick={listclick}
                                    >
                                        test
                                    </Button>
                                    {/* <ModalButtonCancel
                                        className="close"
                                        onClick={close}
                                    >
                                        취소
                                    </ModalButtonCancel>
                                    <ModalButtonConfirm
                                        onClick={() => {
                                            _onChange();
                                        }}
                                    >
                                        확인
                                    </ModalButtonConfirm> */}
                                </ModalButton>
                            </ModalPopup>
                        </MainModal>
                    </Section>
                ) : null}
            </div>
        </>
    );
};

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainModal = styled.div`
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${theme.color.black};
    border-radius: 20px;
`;
const ModalPopup = styled.div`
    height: 100%;
    padding: 20px;
`;
const ModalTitle = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    padding-right: 16px;

    color: #f6f6f6;
`;
const ModalSubTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;

    color: #f6f6f6;
`;
const ModalText = styled.div`
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome , Safari , Opera */
    }
    white-space: pre-line;
`;

const ModalTextNo = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${theme.color.red};
    opacity: ${props => (props.select ? 1 : 0.2)};
    width: 20%;
    text-align: center;
`;
const ModalTextBankName = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 20%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalTextBankdes = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 40%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalTextBankTime = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    width: 20%;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};
`;
const ModalButton = styled.div`
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 97.5%;
`;
const ModalButtonConfirm = styled.div`
    height: 40px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #9e9e9e;
`;
const ModalButtonCancel = styled.div`
    height: 40px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #9e9e9e;
`;

// default props 작성 위치
ModalImportBook.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModalImportBook;
