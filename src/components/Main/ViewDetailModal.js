import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewDetailModal.css';

export const ViewDetailModal = (props) => {
    const dispatch = useDispatch();
    const { open, close, temp } = props;  

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openModal modals" : "modals"}>
        {open ? (
            <section className="max-w-7xl">
                <header>
                    <div>ANGRY SAVING 분노 게시글 작성</div>
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                </header>
                <div>
                    {temp}
                </div>
                <main className="flex flex-col h-full text-dgray-600">
                    <>
                    </>
                    <button className="close" onClick={close}>닫기</button>
                </main>
            </section>
        ) : null}
        </div>
    );
};