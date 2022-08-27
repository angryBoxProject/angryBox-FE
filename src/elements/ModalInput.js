import React from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';

const ModalInput = props => {
    const {
        placeholder,
        _onChange,
        type,
        _type,
        _accept,
        _ref,
        _onClick,
        _onKeyDown,
        value,
        multiLine,
        row,
        width,
    } = props;

    if (multiLine) {
        return (
            <>
                <ElTextarea
                    rows={row}
                    placeholder={placeholder}
                    onChange={_onChange}
                    width={width}
                    value={value}
                ></ElTextarea>
            </>
        );
    }
    return (
        <React.Fragment>
            <ElInput
                type={type}
                ref={_ref}
                onKeyDown={_onKeyDown}
                placeholder={placeholder}
                onChange={_onChange}
                width={width}
                value={value}
            />
        </React.Fragment>
    );
};

ModalInput.defaultProps = {
    placeholder: '텍스트를 입력해주세요.',
    type: 'text',
    is_float: false,
    width: '',
    height: '',
    rows: 15,
    _onChange: () => {},
    _onClick: () => {},
    _onKeyDown: () => {},
};

const ElInput = styled.input`
    border: 1px solid #282828;
    width: 100%;
    height: 40px;
    padding: 6px 20px 8px;
    background: #F6F6F6;
    ${props => (props.width ? `width:${props.width};` : '')}
`;
const ElTextarea = styled.textarea`
    ${props => (props.width ? `width:${props.width};` : '')}
    background: #F6F6F6;
    box-sizing: border-box;
    border: 1px solid #282828;
    ::placeholder {
        display: flex;
        align-items: center;
    }
`;
const FloatInput = styled.div`
    width: 54px;
    height: 54px;
    background-color: ${theme.color.orange};
    color: #ffffff;
    box-sizing: border-box;
    font-size: 24px;
    font-weight: 800;
    position: absolute;
    bottom: 10%;
    right: 10%;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;
const FileInput = styled.input`
    width: 54px;
    height: 54px;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
    font-size: 45px;
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;

    filter: alpha(opacity=0);
    -ms-filter: 'alpha(opacity=0)';
    -khtml-opacity: 0;
    -moz-opacity: 0;
`;

export default ModalInput;
