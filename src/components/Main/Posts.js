import React, { useState } from 'react';
import styled from 'styled-components';
import ModaPostDetail from '../Modal/ModaPostDetail';
import Post from './Post';

import { ReactComponent as ListIconLock } from '../../static/image/main/list_icon_lock.svg';
import { ReactComponent as ListIconUnlock } from '../../static/image/main/list_icon_unlock.svg';

const Posts = props => {
    const { postlist } = props;

    return (
        <>
            {postlist?.map((data, index) => {
                if (!data?.deleted) {
                    console.log(data)
                    return (
                        <ListItem
                            key={index}
                            onClick={() => {
                                setModalPost(true);
                            }}
                        >
                            <ListIndex>
                                NO. {data.id}
                            </ListIndex>
                            <ListDetail>
                                <ListTitle>
                                    <span style={{marginRight: "11px"}}>{data.dateTime.substr(5).replace('-', '.')}</span>
                                    {data.title}
                                </ListTitle>
                                <ListDesc>
                                    {data.content}
                                </ListDesc>
                            </ListDetail>
                            <LockIcon>
                                <ListIconLock />
                                {/* <ListIconUnlock /> */}
                            </LockIcon>
                        </ListItem>
                    );
                }
            })}
        </>
    );
};
const ListItem = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 308px;
    height: 266px;
    background: #ECECEC;
    margin-right: 30px;
    margin-bottom: 30px;
    cursor: pointer;

    &:nth-child(3n) {
        margin-right: 0;
    }

    &:hover {
        background: #813BF3;

        div {
            color: #F6F6F6;
        }
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
    background:url(../../static/image/main/list_icon_lock.svg) no-repeat;
`
export default Posts;
