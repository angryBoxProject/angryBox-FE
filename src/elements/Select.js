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
    padding: 12px 12px;
    margin: 14px 11px 14px 0px;
    box-sizing: border-box;
    border: 1px solid #f6f6f6;
    border-radius: 4px;
    background: #2e2e2e;
    color: #f6f6f6;
    opacity: 0.5;
    option {
        background-color: #2e2e2e;
        border: 1px solid #c4c4c4;
        box-sizing: border-box;
        border-radius: 15px;
        color: #f6f6f6;
        opacity: 0.5;
    }
`;

Select.defaultProps = {
    placeholder: '텍스트를 입력해주세요.',
    onChange: () => {},
};
export default Select;
