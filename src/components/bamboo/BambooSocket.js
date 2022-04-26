import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

// import SockJS from 'sockjs-client';
// import StompJs from '@stomp/stompjs';
const BambooSocket = props => {
    let sock = useRef({});
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
        console.log('connet');
        client.connect({}, onConnected, onError);
        sock.addEventListener('open', () => {
            console.log('Connected to Browser!!!😀');
        });
        sock.addEventListener('message', message => {
            console.log('Got this:', message, '😀');
        });
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
        // let payloadData = JSON.parse(payload.body);
        //이전엔 파싱해줬는데 이번엔 파싱한 json타입으로 와서 그냥적용
        console.log('payloadData=', payload.body);
        // setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
    };

    const onError = err => {
        console.log('Error', err);
    };
    const handleMessage = event => {
        const { value } = event.target;
        setUserData({ ...userData, content: value });
    };
    return (
        <>
            <div>BambooSocket</div>
        </>
    );
};
export default BambooSocket;
