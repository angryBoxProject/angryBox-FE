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
        width,
    } = props;

    return (
        <React.Fragment>
            <ElInput
                type={type}
                ref={_ref}
                onKeyDown={_onKeyDown}
                placeholder={placeholder}
                onChange={_onChange}
                width={width}
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
    _onChange: () => {},
    _onClick: () => {},
    _onKeyDown: () => {},
};

const ElInput = styled.input`
    border-bottom: 1px solid #f6f6f6;
    width: 100%;
    padding: 12px 12px;
    margin-top: 14px;
    box-sizing: border-box;
    background: #2e2e2e;
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
