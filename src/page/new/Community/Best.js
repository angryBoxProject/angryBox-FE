
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '../../../Layouts/MainLayout';
import Contents from '../../../Layouts/Contents';

import { ReactComponent as FireIcon } from '../../../static/image/community/fire.svg';
import { ReactComponent as HandIcon } from '../../../static/image/community/hand.svg';
import { ReactComponent as ViewIcon } from '../../../static/image/community/view.svg';
import { ReactComponent as FilterArrow } from '../../../static/image/community/filter_arrow.svg';

const bestList = [
    {title: "post title", hand: "381", view: "2486", datetime: "04.08", contents: "본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내"},
    {title: "post title", hand: "381", view: "2486", datetime: "04.08", contents: "본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용"},
    {title: "post title", hand: "381", view: "2486", datetime: "04.08", contents: "본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용"},
    {title: "post title", hand: "381", view: "2486", datetime: "04.08", contents: "본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용"},
    {title: "post title", hand: "381", view: "2486", datetime: "04.08", contents: "본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내용 본문내"}
]

const optionItems = [
    "필터적용", "필터1", "필터2", "필터3"
]

const Best = props => {
    const [select, setSelect] = useState(false)
    const [option, setOption] = useState('필터적용')
    const navigate = useNavigate();

    return(
        <MainLayout nav={true}>
            <Contents header={true}>
                <TablelistWrap>

                    <TablelistBest>
                        <TableHead>
                            <Title>
                                <FireIcon />
                                <Text>실시간 Best</Text>
                            </Title>
                            <FilterWrap onClick={() => setSelect(!select)}>
                                {option}

                                <Arrow style={{transform: select ? "rotate(180deg) translate(0, 50%)" : ""}}>
                                    <FilterArrow />
                                </Arrow>
                                {select &&
                                    <OptionWarp>
                                        {optionItems.map((option, key) => {
                                            return(
                                                <OptionItem key={key} onClick={() => setOption(option)}>
                                                    {option}
                                                </OptionItem>
                                            )
                                        })}
                                    </OptionWarp>
                                }
                            </FilterWrap>
                        </TableHead>
                        <TableBody>
                            {bestList.map((item, key) => {
                                return (
                                    <BodyItem key={key}>
                                        <TitleWrap>
                                            <ItemTitleWrap>
                                                <ItemTitle>{item.title}</ItemTitle>
                                                <ItemDate>{item.datetime}</ItemDate>
                                            </ItemTitleWrap>
                                            <ItemInfoWrap>
                                                <HandWrap>
                                                    <HandIcon />
                                                    <HandValue>{item.hand}</HandValue>
                                                </HandWrap>
                                                <ViewWrap>
                                                    <ViewIcon />
                                                    <ViewValue>{item.view}</ViewValue>
                                                </ViewWrap>
                                            </ItemInfoWrap>
                                        </TitleWrap>
                                        <Detail>
                                            {item.contents}
                                        </Detail>
                                    </BodyItem>
                                )
                            })}
                        </TableBody>
                    </TablelistBest>
                </TablelistWrap>
            </Contents>
        </MainLayout>
    )
}

const TablelistWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 0 36px;
`
const TablelistBest = styled.div`
    width: 100%;
`
const TableHead = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
`
const Title = styled.div`
    display: flex;
    align-items: center;
`
const Text = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #737373;
    margin-left: 6.5px;
`
const FilterWrap = styled.div`
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    background-color: #813BF3;
    height: 46px;
    width: 130px;
    padding: 11px 50px 10px 15px; 
    position: relative;
    cursor: pointer;
`
const OptionWarp = styled.div`
    width: 130px;
    height: 140px;
    border: solid 1px #813BF3;
    background: #fff;
    position: absolute;
    top: 46px;
    left: 0px;
    overflow-y: scroll;
`
const OptionItem = styled.div`
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #282828;
    padding: 0 15px;
    cursor: pointer;

    &:hover {
        background: #813BF3;
        color: #F6F6F6;
    }
`
const Arrow = styled.div`
    width: 46px;
    height: 46px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
`;
const TableBody = styled.div`
`
const BodyItem = styled.div`
    width: 100%;
    height: 208px;
    padding: 18px 32.5px 16.5px;
    background: #ECECEC;
    cursor: pointer;
    margin-bottom: 30px;
`
const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ItemTitleWrap = styled.div`

`
const ItemTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
`
const ItemDate = styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #737373;
`
const ItemInfoWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HandWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const HandValue = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-left: 8px;
`
const ViewWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 22px;
`
const ViewValue = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-left: 8px;
`
const Detail = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #737373;
    margin-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`

export default Best;

