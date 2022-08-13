import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalLayout from '../../Layouts/ModalLayout';
import { useBanks } from '../../hooks/useBanks';

const bankTableHead = ['No', '적금명', '세부 설명', '설계일'];
const writingTableHead = ['No', '게시글명', '본문', '작성일'];
const bankTableList = [
    { id: '1', name: '화를줄이자', count1: '17', count2: '391', date: '3/11' },
    { id: '1', name: '화를줄이자', count1: '17', count2: '391', date: '3/11' },
    { id: '1', name: '화를줄이자', count1: '17', count2: '391', date: '3/11' },
];
const writingTableList = [
    {
        id: '1',
        name: '소연이의 요리 일기 1',
        content:
            '본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문',
        date: '3/11',
    },
    {
        id: '1',
        name: '소연이의 요리 일기 1',
        content:
            '본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문본문 본문 본문',
        date: '3/11',
    },
];

const ModalLoad = props => {
    const { title, modalType, contentType, close } = props;

    const { status, data: bankList, error, isFetching, refetch } = useBanks();
    const [modal, setModal] = useState(false);

    const [select, setSelect] = useState(false);
    const [selectbankId, setSelectbankId] = useState();

    console.log(bankList, select, selectbankId);
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
                        {bankList.coinBankList.map((item, index) => (
                            <BodyItem
                                select={selectbankId === item.coinBankId}
                                key={index}
                                onClick={() => {
                                    if (selectbankId === item.coinBankId) {
                                        setSelectbankId(null);
                                        setSelect(false);
                                    } else {
                                        setSelectbankId(item.coinBankId);
                                        setSelect(true);
                                    }
                                }}
                            >
                                <No>{item.coinBankId}</No>
                                <Name>{item.coinBankName}</Name>
                                <Detail>
                                    <Writing>
                                        게시글 수{' '}
                                        <Count>{item.diaryCount}</Count>
                                    </Writing>
                                    <Stroke>
                                        총 쓰담 수{' '}
                                        <Count>{item.todackCount}</Count>
                                    </Stroke>
                                </Detail>
                                <Date>{item.bankAccount}</Date>
                            </BodyItem>
                        ))}
                    </>
                );
        }
    }, [status, isFetching, select]);
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <Table>
                <TableHead>
                    {contentType === 'bank' ? (
                        <>
                            {bankTableHead.map((item, key) => {
                                return <HeadItem key={key}>{item}</HeadItem>;
                            })}
                        </>
                    ) : (
                        <>
                            {writingTableHead.map((item, key) => {
                                return <HeadItem key={key}>{item}</HeadItem>;
                            })}
                        </>
                    )}
                </TableHead>
                <TableBody>
                    {contentType === 'bank' ? (
                        <>
                            {/* 적금 불러오기 */}
                            {renderByStatus()}
                        </>
                    ) : (
                        <>
                            {/* 게시글 목록 */}
                            {writingTableList.map((item, key) => {
                                return (
                                    <BodyItem select={true}>
                                        <No>{item.id}</No>
                                        <Name>{item.name}</Name>
                                        <Content>{item.content}</Content>
                                        <Date>{item.date}</Date>
                                    </BodyItem>
                                );
                            })}
                        </>
                    )}
                </TableBody>
            </Table>
            <ActionButton
                onClick={() => {
                    if (contentType === 'bank') setModal(true);
                    else close();
                }}
            >
                {contentType === 'bank' ? '불러오기' : '닫기'}
            </ActionButton>
            {modal && (
                <ModalLoad
                    title="게시글 목록"
                    modalType="list"
                    contentType="notbank"
                    close={() => setModal(false)}
                />
            )}
        </ModalLayout>
    );
};
const Table = styled.div`
    width: 100%;
`;
const TableHead = styled.div`
    border-bottom: solid 1px #737373;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 19px;
`;
const HeadItem = styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #282828;

    &:nth-child(1) {
        min-width: 50px;
        color: #813bf3;
    }
    &:nth-child(2) {
        min-width: 250px;
    }
    &:nth-child(3) {
        width: 100%;
    }
    &:nth-child(4) {
        min-width: 60px;
        text-align: right;
    }
`;
const TableBody = styled.div`
    padding-top: 15px;
`;
const BodyItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px;
    margin-bottom: 10px;
    text-align: center;
    opacity: ${props => (props.select ? 1 : 0.2)};

    div:nth-child(1) {
        min-width: 50px;
        color: #813bf3;
    }
    div:nth-child(2) {
        min-width: 250px;
    }
    div:nth-child(3) {
        width: 100%;
    }
    div:nth-child(4) {
        min-width: 60px;
        text-align: right;
    }
`;
const No = styled.div``;
const Name = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const Detail = styled.div``;
const Writing = styled.span`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-right: 25px;
`;
const Stroke = styled.span`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const Count = styled.span`
    color: #813bf3;
    font-weight: 700;
`;
const Date = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`;
const Content = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-right: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const ActionButton = styled.button`
    width: 100%;
    max-width: 440px;
    height: 44px;
    border: solid 3px #813bf3;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
    margin-top: 50px;
`;
export default ModalLoad;
