import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { URL } from '../Apis/API';
import { setUserName } from '../redux/modules/member';
import { MainCard } from '../elements';
import { WriteAngryModal } from '../components/WriteAngryModal';
import { mainPageLoad } from '../redux/modules/diary';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { openModal } = props;
    const [isOpen, setOpen] = useState(false);
    const { data: loginResult } = useQuery(['login'], () => {});
    console.log(loginResult);
    const memberNick = useSelector(state => state.member.nickname);
    const testServer = async () => {
        // dispatch(setUserName('test'));
        // try {
        //     console.log('axios');
        //     const data = await axios
        //         .get('https://angrybox.link')
        //         .then(res => console.log(res));
        //     console.log(data);
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const gettest = async () => {
        const { data } = await URL.get('/');
        return data;
    };
    const query = useQuery('test', gettest);

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(mainPageLoad(dispatch));
    }, [])
    

    return ( 
        <>
        <div className='grid grid-cols-2 gap-4'>
            <div className='grid col-start-1'>
            <div>HOME</div>
            <button className="bg-slate-500" onClick={testServer}>
                testButton
            </button>
            <button
                className="bg-slate-500"
                onClick={() => {
                    navigate('/login');
                }}
            >
                testButton2
            </button>
            </div>
            <div className='grid w-2/3 col-start-2 '>
                <div>
                    <button>이번 달은 진짜로</button>
                    <span>총 게시글 수 </span>
                    <span>총 쓰담 수 </span>
                </div>
                <div className='grid grid-flow-row grid-cols-2 gap-1 place-items-center'>
                    <MainCard size='3'></MainCard>
                    <MainCard size='3'></MainCard>
                    <MainCard size='3'></MainCard>
                    <MainCard size='3'></MainCard>
                    <MainCard size='3'></MainCard>
                    <MainCard size='3'></MainCard>
                </div>
                <button onClick={openModal} className='bg-blue-300'>분노 저금하기</button>
            </div>
        </div>
        <WriteAngryModal open={isOpen} close={closeModal}/>
        </>
    );
};

export default Main;
