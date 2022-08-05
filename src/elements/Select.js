import React from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';
const Select = props => {
    const { placeholder, onChange, ispublic } = props;

    const ispublics = ['비공개', '공개글'];
    const angryPhase = ['극소노', '소노', '중노', '대노', '극대노'];
    if (ispublic)
        return (
            <>
                <ElSelect placeholder={placeholder} onChange={onChange}>
                    {ispublics.map((v, i) => {
                        return <option key={i}>{v}</option>;
                    })}
                </ElSelect>
            </>
        );
    return (
        <>
            <ElSelect placeholder={placeholder} onChange={onChange}>
                {angryPhase.map((v, i) => {
                    return <option key={i}>{v}</option>;
                })}
            </ElSelect>
        </>
    );
};

const ElSelect = styled.select`
    width: auto;
    min-width: 125px;
    height: 44px;
    padding: 0 10px;
    border: 1px solid #282828;
    background: #F6F6F6;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #737373;
    margin-left: 20px;
    option {
        background-color: #F6F6F6;
        border: 1px solid #c4c4c4;
        box-sizing: border-box;
        border-radius: 15px;
        color: #282828;
    }
`;

Select.defaultProps = {
    placeholder: '텍스트를 입력해주세요.',
    onChange: () => {},
};
export default Select;
