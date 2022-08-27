import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../../hooks/useIsMount';
import { getBankFirstPostList } from '../../redux/modules/bank';
import { getBankPostList } from '../../redux/modules/main';
import { useInView } from 'react-intersection-observer';

import theme from '../../Styles/theme';

import Posts from './Posts';
import { tokenURL } from '../../Apis/API';

const PostList = props => {
    // const { bankId } = props;
    // const [modalPost, setModalPost] = useState();
    // const [ref, inView] = useInView();
    // const [loading, setLoading] = useState(false);
    // const [bankpostlist, setBankpostlist] = useState([]);
    // const [lastId, setLastId] = useState(0);
    // const getList = useCallback(async () => {
    //     console.log(bankpostlist);
    //     setLoading(true);
    //     const data = {
    //         coinBankId: bankId,
    //         lastDiaryId: lastId,
    //     };
    //     await tokenURL
    //         .get(`/diaries/coinBank/${data.coinBankId}/${data.lastDiaryId}/15`)
    //         .then(res => {
    //             console.log(res);
    //             const list = res.data.data.diaryListInCoinBank;
    //             setBankpostlist(prevState => [...prevState, ...list]);
    //         });
    //     setLoading(false);
    // }, [lastId]);
    // useEffect(() => {
    //     getList();
    // }, [getList]);
    // useEffect(() => {
    //     if (inView && !loading) {
    //         setLastId(prevState => prevState + 5);
    //     }
    // }, [inView, loading]);
    // // const { lastDiaryId, bankpostlist, hasMoreBankPosts, listloading } =
    // //     useSelector(state => state.main);
    // const data = {
    //     coinBankId: bankId,
    //     lastDiaryId: lastDiaryId,
    // };
    // const dispatch = useDispatch();
    // // const scrollRef = useRef();
    // // const isMount = useIsMount();
    // // let flag = false;
    // // useEffect(() => {
    // //     if (!flag) {
    // //         dispatch(getBankFirstPostList(data));
    // //         flag = true;
    // //     }
    // // }, []);
    // // useEffect(() => {
    // //     function onScroll() {
    // //         const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
    // //         if (clientHeight + scrollTop > scrollHeight - 300) {
    // //             if (
    // //                 hasMoreBankPosts &&
    // //                 bankpostlist &&
    // //                 !listloading &&
    // //                 isMount.current
    // //             ) {
    // //                 dispatch(getBankPostList(data));
    // //             }
    // //         }
    // //     }
    // //     scrollRef.current.addEventListener('scroll', onScroll);
    // //     return () => {
    // //         scrollRef.current.removeEventListener('scroll', onScroll);
    // //     };
    // // }, [hasMoreBankPosts, bankpostlist, listloading, isMount]);
    // // console.log(bankpostlist, 'bankpostlist');
    // return (
    //     <List ref={scrollRef}>
    //         {bankpostlist && <Posts postlist={bankpostlist} />}
    //     </List>
    // );
    return null;
};
const List = styled.div``;
export default PostList;
