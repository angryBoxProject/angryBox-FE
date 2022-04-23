import React from 'react';
import './WriteAngryModalCSS.css';

export const WriteAngryModal = (props) => {
    const { open, close } = props;  
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
                <main className="flex flex-col h-full text-dgray-600">
                    <>
                        <input placeholder='제목을 입력하세요.'></input>
                        <select>
                            <option>공개</option>
                            <option>비공개</option>
                        </select>
                        <select>
                            <option>극소노</option>
                            <option>소노</option>
                            <option>중노</option>
                            <option>대노</option>
                            <option>극대노</option>
                        </select>
                        <input placeholder='본문 내용을 입력하세요.'/>
                    </>
                    <button className="close" onClick={close}>완료</button>
                </main>
            </section>
        ) : null}
        </div>
    );
};