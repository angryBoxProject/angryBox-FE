import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import ModalImportposttoBank from './ModalImportposttoBank';

import { useLinterims } from '../../hooks/useLinterims';

const ModalLinterimList = props => {
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
    const [modalstatePost, SetmodalPost] = useState(false);

    const {
        status,
        data: linterimList,
        error,
        isFetching,
        refetch,
    } = useLinterims();

    const renderByStatus = useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>loading</div>;
            case 'error':
                if (error instanceof Error) {
                    return <span>Error: {error.message}</span>;
                }
                break;
            default:
                return (
                    <>
                        <FlexDiv justify="space-between" padding="10px">
                            <FlexDiv>
                                <ModalTitle>{title}</ModalTitle>
                                <ModalSubTitle>{subtitle}</ModalSubTitle>
                            </FlexDiv>
                            <CloseButton onClick={close} />
                        </FlexDiv>
                        <FlexDiv justify="space-between" padding="10px">
                            <ModalTextNo select={true}>No</ModalTextNo>
                            <ModalTextBankName select={true}>
                                게시글명
                            </ModalTextBankName>
                            <ModalTextBankdes select={true}>
                                본문
                            </ModalTextBankdes>
                            <ModalTextBankTime select={true}>
                                작성일
                            </ModalTextBankTime>
                        </FlexDiv>
                        <hr />
                        {linterimList.map((data, index) => (
                            <FlexDiv
                                key={index}
                                justify="space-between"
                                padding="10px"
                                onClick={() => {
                                    setSelect(!select);
                                    if (selectbankId === data.coinBankId)
                                        setSelectbankId(null);
                                    else setSelectbankId(data.coinBankId);
                                }}
                            >
                                <ModalTextNo select={select}>
                                    {data.id}
                                </ModalTextNo>
                                <ModalTextBankName select={select}>
                                    {data.title}
                                </ModalTextBankName>
                                <ModalTextBankdes select={select}>
                                    게시글 수
                                    <ModalTextBankdesNum>
                                        {data.content}
                                    </ModalTextBankdesNum>
                                </ModalTextBankdes>
                                <ModalTextBankTime select={select}>
                                    {data.dateTime}
                                </ModalTextBankTime>
                            </FlexDiv>
                        ))}
                    </>
                );
        }
    }, [status, isFetching, select]);
    return (
        <>
            <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                    <>
                        <Section>
                            <MainModal width={width} height={height}>
                                <ModalPopup>
                                    {renderByStatus()}

                                    <ModalText></ModalText>
                                    <ModalButton>
                                        <Button
                                            is_disabled={!selectbankId}
                                            onClick={() => {
                                                SetmodalPost(true);
                                            }}
                                        >
                                            불러오기
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
                            {/* <ModalImportposttoBank
                                title="FILE LIST"
                                subtitle="게시글 목록"
                                width="80%"
                                height="80%"
                                bankId={selectbankId}
                                open={modalstatePost}
                                close={() => {
                                    SetmodalPost(false);
                                }}
                            /> */}
                        </Section>
                    </>
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
    width: 100%;
    height: 100%;
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
const ModalTextBankdesNum = styled.span`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${theme.color.red};
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
ModalLinterimList.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModalLinterimList;
