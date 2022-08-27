import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { pushrealDiary } from '../../redux/modules/bamboo';

// import SockJS from 'sockjs-client';
// import StompJs from '@stomp/stompjs';
const BambooSocket = props => {
    let sock = useRef({});
    const dispatch = useDispatch();
    const sockUrl = process.env.REACT_APP_IP + '/stomp/topic';
    sock = new SockJS(sockUrl);
    let client = over(sock);
    const [userData, setUserData] = useState({
        sender: '',
        connected: false,
        message: null,
    });
    useEffect(() => {
        connect();
        return () => {
            if (client.connected) {
                client.unsubscribe();
                client.disconnect();
            }
        };
    }, []);

    const connect = () => {
        client.connect({}, onConnected, onError);
        sock.addEventListener('open', () => {
            console.log('Connected to Browser!!!😀');
        });
        // sock.addEventListener('message', message => {
        //     console.log('Got this:', message, '😀');
        // });
        sock.addEventListener('close', () => {
            console.log('Disconnected to Server😀');
        });
    };

    //연결
    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        //구독
        client.subscribe(`/sub/topic/bamboo`, onMessageReceived, onError);

        userJoin();
    };
    //유저입장
    const userJoin = () => {
        let chatMessage = {
            sender: '',
            type: 'ENTER',
            hello: 'hello',
        };
        let test = {
            greeting: 'asdf',
        };
        setUserData({
            ...userData,
            connected: true,
        });

        client.send('/pub/topic/bamboo/enter', {}, JSON.stringify(test));
    };

    //리시브
    const onMessageReceived = payload => {
        // console.log(payload);
        let payloadData = JSON.parse(payload.body);
        console.log('payloadData=', payloadData);
        // setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
        // dispatch(pushrealDiary(payloadData));
        props.setRecentList(prev => [...payloadData, ...props.itemlist]);
    };

    const onError = err => {
        console.log('Error', err);
    };
    const handleMessage = event => {
        const { value } = event.target;
        setUserData({ ...userData, content: value });
    };
    return null;
};
export default BambooSocket;
