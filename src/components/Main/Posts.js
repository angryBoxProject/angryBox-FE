import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { ReactComponent as ListIconLock } from '../../static/image/main/list_icon_lock.svg';
import { ReactComponent as ListIconUnlock } from '../../static/image/main/list_icon_unlock.svg';
import ModalPostDetail from '../Modal/ModalPostDetail';
import { useInView } from 'react-intersection-observer';
import { tokenURL } from '../../Apis/API';

const Posts = props => {
    const { bankId } = props;

    const [modalPost, setModalPost] = useState(null);
    const [status, setStatus] = useState('view');
    const [ref, inView] = useInView();
    const [loading, setLoading] = useState(false);
    const [bankpostlist, setBankpostlist] = useState([]);
    const [lastId, setLastId] = useState(0);

    const getList = useCallback(async () => {
        setLoading(true);
        const data = {
            coinBankId: bankId,
            lastDiaryId: lastId,
        };

        await tokenURL
            .get(`/diaries/coinBank/${data.coinBankId}/${data.lastDiaryId}/15`)
            .then(res => {
                const list = res.data.data.diaryListInCoinBank;
                setBankpostlist(prevState => [...prevState, ...list]);
            });
        setLoading(false);
    }, [lastId]);

    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        if (inView && !loading) {
            setLastId(bankpostlist[bankpostlist.length - 1]?.id);
        }
    }, [inView, loading]);

    return (
        <>
            {bankpostlist?.map((data, key) => {
                if (!data?.deleted) {
                    return (
                        <ListItem
                            key={key}
                            onClick={() => {
                                setModalPost(data.id);
                            }}
                        >
                            {bankpostlist.length - 1 ||
                            bankpostlist.length - 2 ||
                            bankpostlist.length - 3 == key ? (
                                <div ref={ref}>
                                    <ListIndex ref={ref}>
                                        NO. {data.id}
                                    </ListIndex>
                                    <ListDetail>
                                        <ListTitle>
                                            <span
                                                style={{ marginRight: '11px' }}
                                            >
                                                {data.dateTime
                                                    .substr(5)
                                                    .replace('-', '.')}
                                            </span>
                                            {data.title}
                                        </ListTitle>
                                        <ListDesc>{data.content}</ListDesc>
                                    </ListDetail>
                                    <LockIcon>
                                        {data.public ? (
                                            <ListIconUnlock />
                                        ) : (
                                            <ListIconLock />
                                        )}
                                    </LockIcon>
                                </div>
                            ) : (
                                <div>
                                    <ListIndex>NO. {data.id}</ListIndex>
                                    <ListDetail>
                                        <ListTitle>
                                            <span
                                                style={{ marginRight: '11px' }}
                                            >
                                                {data.dateTime
                                                    .substr(5)
                                                    .replace('-', '.')}
                                            </span>
                                            {data.title}
                                        </ListTitle>
                                        <ListDesc>{data.content}</ListDesc>
                                    </ListDetail>
                                    <LockIcon>
                                        {data.public ? (
                                            <ListIconUnlock />
                                        ) : (
                                            <ListIconLock />
                                        )}
                                    </LockIcon>
                                </div>
                            )}
                        </ListItem>
                    );
                }
            })}

            {modalPost && (
                <ModalPostDetail
                    id={modalPost}
                    title="분노 게시글"
                    modalType="form"
                    status={status}
                    setStatus={setStatus}
                    isnoti={false}
                    close={() => {
                        setModalPost(null);
                    }}
                />
            )}
        </>
    );
};
const ListItem = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 298px;
    /* width: 308px; */
    height: 266px;
    background: #ececec;
    margin-right: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    /* &:nth-child(3n) {
        margin-right: 0;
    } */
    &:hover {
        background: #813bf3;

        div {
            color: #f6f6f6;
        }
    }
`;
const Nth3 = styled.div`
    &:nth-child(3n) {
        margin-right: 0;
    }
`;
const ListIndex = styled.div`
    font-family: 'Montserrat-Bold';
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #282828;
    padding: 15px 14px;
`;
const ListDetail = styled.div`
    padding: 0 15px 20px;
`;
const ListTitle = styled.div`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #282828;
`;
const ListDesc = styled.div`
    font-weight: 350;
    font-size: 16px;
    line-height: 23px;
    color: #282828;
`;
const LockIcon = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    background: url(../../static/image/main/list_icon_lock.svg) no-repeat;
`;
export default Posts;
