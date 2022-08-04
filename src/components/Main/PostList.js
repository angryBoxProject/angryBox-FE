import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../../hooks/useIsMount';
import { getBankFirstPostList } from '../../redux/modules/bank';
import { getBankPostList } from '../../redux/modules/main';
import theme from '../../Styles/theme';
import ModaPostDetail from '../Modal/ModaPostDetail';
import Posts from './Posts';

const PostList = props => {
    const { bankId } = props;
    const [modalPost, setModalPost] = useState();

    const { lastDiaryId, bankpostlist, hasMoreBankPosts, listloading } =
        useSelector(state => state.main);
    const data = {
        coinBankId: bankId,
        lastDiaryId: lastDiaryId,
    };

    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
    let flag = false;
    useEffect(() => {
        if (!flag) {
            dispatch(getBankFirstPostList(data));
            flag = true;
        }
    }, []);

    useEffect(() => {
        function onScroll() {
            const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
            if (clientHeight + scrollTop > scrollHeight - 300) {
                if (
                    hasMoreBankPosts &&
                    bankpostlist &&
                    !listloading &&
                    isMount.current
                ) {
                    dispatch(getBankPostList(data));
                }
            }
        }
        scrollRef.current.addEventListener('scroll', onScroll);
        return () => {
            scrollRef.current.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreBankPosts, bankpostlist, listloading, isMount]);
    console.log(bankpostlist, 'bankpostlist');
    return (
        <List ref={scrollRef}>
            {bankpostlist && <Posts postlist={bankpostlist} />}
        </List>
    );
};
const List = styled.div`
`;
export default PostList;
