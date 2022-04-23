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
        // client.activate();
        return () => {
            // client.deactivate();
            if (client.connected) {
                client.unsubscribe();
                client.disconnect();
            }
        };
    }, []);
    // const client = new StompJs.Client({
    //     brokerURL: process.env.REACT_APP_IP + '/stomp/topic',
    //     connectHeaders: {
    //         login: 'user',
    //         passcode: 'password',
    //     },
    //     debug: function (str) {
    //         console.log(str);
    //     },
    //     reconnectDelay: 5000, //자동 재 연결
    //     heartbeatIncoming: 4000,
    //     heartbeatOutgoing: 4000,
    // });

    // client.onConnect = function (frame) {
    //     console.log(frame);
    // };

    // client.onStompError = function (frame) {
    //     console.log('Broker reported error: ' + frame.headers['message']);
    //     console.log('Additional details: ' + frame.body);
    // };

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
        };
        setUserData({
            ...userData,
            connected: true,
        });

        client.send('/stomp/topic', {}, JSON.stringify(chatMessage));
    };

    //리시브
    const onMessageReceived = payload => {
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        console.log('payloadData=', payloadData);
        setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
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
