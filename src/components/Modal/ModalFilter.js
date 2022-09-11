import React, { useState } from 'react';
import styled from 'styled-components';
import ModalLayout from '../../Layouts/ModalLayout';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalenderIcon } from '../../static/image/statistic/CalenderIcon.svg';
const ModalFilter = props => {
    const { title, modalType, contentType, close } = props;
    const [image, setImage] = useState();
    const [angry, setAngry] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    console.log(angry, startDate, endDate);

    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            <TitleArea>
                <LabelTitle>날짜</LabelTitle>
                <Contents>
                    <ContentItem select={true}>
                        <CalenderIcon fill="##282828"></CalenderIcon>
                        <DatePicker
                            selected={startDate}
                            dateFormat="yyyy-MM-dd"
                            onChange={date => setStartDate(date)}
                            selectsStart
                            locale={ko}
                            startDate={startDate}
                            endDate={endDate}
                        ></DatePicker>
                    </ContentItem>
                    <ContentItem select={true}>~</ContentItem>
                    <ContentItem select={true}>
                        <CalenderIcon fill="##282828"></CalenderIcon>

                        <DatePicker
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            locale={ko}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        ></DatePicker>
                    </ContentItem>
                </Contents>
            </TitleArea>
            <Compensation>
                <LabelTitle>분노 수치</LabelTitle>
                <Contents>
                    <ContentItem
                        select={angry.includes(1)}
                        onClick={() => {
                            if (!angry.includes(1))
                                setAngry(prev => [...prev, 1]);
                            else setAngry(angry.filter(x => x !== 1));
                        }}
                    >
                        극소노
                    </ContentItem>
                    <ContentItem
                        select={angry.includes(2)}
                        onClick={() => {
                            if (!angry.includes(2))
                                setAngry(prev => [...prev, 2]);
                            else setAngry(angry.filter(x => x !== 2));
                        }}
                    >
                        소노
                    </ContentItem>
                    <ContentItem
                        select={angry.includes(3)}
                        onClick={() => {
                            if (!angry.includes(3))
                                setAngry(prev => [...prev, 3]);
                            else setAngry(angry.filter(x => x !== 3));
                        }}
                    >
                        중노
                    </ContentItem>
                    <ContentItem
                        select={angry.includes(4)}
                        onClick={() => {
                            if (!angry.includes(4))
                                setAngry(prev => [...prev, 4]);
                            else setAngry(angry.filter(x => x !== 4));
                        }}
                    >
                        대노
                    </ContentItem>
                    <ContentItem
                        select={angry.includes(5)}
                        onClick={() => {
                            if (!angry.includes(5))
                                setAngry(prev => [...prev, 5]);
                            else setAngry(angry.filter(x => x !== 5));
                        }}
                    >
                        극대노
                    </ContentItem>
                </Contents>
            </Compensation>
            <ContentsArea>
                <LabelTitle>이미지</LabelTitle>
                <Contents>
                    <ContentItem
                        select={image === 0}
                        onClick={() => {
                            setImage(0);
                        }}
                    >
                        있음
                    </ContentItem>
                    <ContentItem
                        select={image === 1}
                        onClick={() => {
                            setImage(1);
                        }}
                    >
                        없음
                    </ContentItem>
                </Contents>
            </ContentsArea>
            <ButtonArea>
                <ModalButton
                    onClick={() => {
                        console.log('test');
                    }}
                >
                    {'적용하기'}
                </ModalButton>
            </ButtonArea>
        </ModalLayout>
    );
};
const TitleArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const LabelTitle = styled.label`
    margin-right: 26px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #282828;
    min-width: 80px;
`;

const Compensation = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const ContentsArea = styled.div`
    width: 100%;
    /* height: 50vh; */
    display: flex;
    margin-bottom: 28px;
`;
const Contents = styled.div`
    width: 100%;
    display: flex;
    margin-left: 60px;
`;
const ContentItem = styled.span`
    display: flex;
    width: 100%;
    margin-right: 30pt;
    justify-content: center;
    align-items: center;
    ${props =>
        props.select
            ? 'opacity:1;   font-weight: 700;'
            : 'opacity:0.5;   font-weight: 500;'};
    cursor: pointer;
`;
const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalButtonBlack = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 440px;
    height: 44px;
    background: #282828;
    border-radius: 22px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #f6f6f6;
    margin-right: 26px;
`;
const ModalButton = styled.button`
    cursor: pointer;
    width: 100%;
    max-width: 440px;
    height: 44px;
    border: solid 3px #813bf3;
    border-radius: 22px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #813bf3;
    display: block;

    &:disabled {
        opacity: 0.5;
    }
`;

export default ModalFilter;
