import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../../hooks/useIsMount';
import { getGallery } from '../../redux/modules/bamboo';
import { getBankFirstPostList } from '../../redux/modules/bank';
import { getBankPostList } from '../../redux/modules/main';
import theme from '../../Styles/theme';
import Posts from '../Main/Posts';


const BambooGallayList = props => {
    const {} = props;
    const [modalPost, setModalPost] = useState();

    const {
        lastGalleryId,
        Gallerylist,
        hasMoreGallerylist,
        Gallerylistloading,
    } = useSelector(state => state.bamboo);
    let data = {
        lastDiaryId: lastGalleryId,
    };

    const dispatch = useDispatch();
    const scrollRef = useRef();
    const isMount = useIsMount();
    let flag = false;
    useEffect(() => {
        if (!flag) {
            dispatch(getGallery(data));
            flag = true;
        }
    }, []);

    useEffect(() => {
        function onScroll() {
            const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
            if (clientHeight + scrollTop > scrollHeight - 300) {
                if (
                    hasMoreGallerylist &&
                    Gallerylist &&
                    !Gallerylistloading &&
                    isMount.current
                ) {
                    dispatch(getGallery(data));
                }
            }
        }
        // scrollRef.current.addEventListener('scroll', onScroll);
        // return () => {
        //     scrollRef.current.removeEventListener('scroll', onScroll);
        // };
    }, [hasMoreGallerylist, Gallerylist, Gallerylistloading, isMount]);
    return (
        <>
            {Gallerylist && (
                <ListScroll ref={scrollRef}>
                    {Gallerylist && <Posts postlist={Gallerylist} />}
                </ListScroll>
            )}
        </>
    );
};
const ListScroll = styled.div`
    min-height: 40%;
    height: calc(100vh - 10.5rem);
    width: 100%;
    padding-right: 20px;
    overflow-y: auto;
    /* overflow-x: auto; */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        //display: none; /* Chrome , Safari , Opera */
        background-color: ${theme.color.black2};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${theme.color.red};
        border-radius: 40px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${theme.color.black2};
        border-radius: 40px;
    }
`;
export default BambooGallayList;
