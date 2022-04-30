import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './WriteAngryModalCSS.css';

export const WriteAngryModal = (props) => {
    const dispatch = useDispatch();
    const { open, close } = props;  

    // 타이틀, 내용
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
    });
    const handleChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    // 공개 여부
    const [isPublic, setIsPublic] = useState(true);
    const publicOptions = [
        { value: true, label: '공개'},
        { value: false, label: '비공개'},
    ]
    const selectPublic = (e) => {
        if (e.target.value == true){
            setIsPublic(true);
        } else{
            setIsPublic(false);
        }
    }

    // 분노 크기
    const [angrySize, setAngrySize] = useState('ExtraSmallAngry');
    const angrySizeOptions = [
        { value: 'ExtraSmallAngry', label: '극소노'},
        { value: 'SmallAngry', label: '소노'},
        { value: 'MiddleAngry', label: '중노'},
        { value: 'BigAngry', label: '대노'},
        { value: 'ExtraBigAngry', label: '극대노'},
    ]
    const selectAngry = (e) => {
        setAngrySize(e.target.value);
    }

    // 작성 버튼
    const writeDiary = () => {
        const data = {
            title: inputs.title,
            content: inputs.content,
            isPublic: isPublic,
            angryPhaseId: angrySize,
        }
        console.log(inputs.title, inputs.content, isPublic, angrySize)
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
        // formData.append('imgFile', )
        // dispatch()
    }

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
                        <input 
                            placeholder='제목을 입력하세요.'
                            type='text'
                            name='title'
                            value={inputs.title}
                            onChange={handleChange}
                        />
                        <select
                            onChange={selectPublic}
                            value={isPublic}
                        >
                            {publicOptions.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={selectAngry}
                            value={angrySize}
                        >
                            {angrySizeOptions.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        
                        <input 
                            placeholder='내용을 입력하세요.'
                            type='text'
                            name='content'
                            value={inputs.content}
                            onChange={handleChange}
                        />
                    </>
                    <button className="close" onClick={writeDiary}>완료</button>
                </main>
            </section>
        ) : null}
        </div>
    );
};