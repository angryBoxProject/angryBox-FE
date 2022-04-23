import React from 'react';
import styled from 'styled-components';
import theme from '../Styles/theme';

const Button = props => {
    const {
        onClick,
        is_float,
        children,
        margin,
        width,
        height,
        padding,
        is_disabled,
        is_edit,
        _accept,
        onChange,
        _type,
        abled,
        value,
        is_green,
    } = props;

    const styles = {
        margin: margin,
        width: width,
        height: height,
        padding: padding,
        is_edit: is_edit,
        abled: abled,
        is_green: is_green,
    };

    if (is_float) {
        return (
            <React.Fragment>
                <FloatButton
                    type={_type}
                    accept={_accept}
                    disabled={is_disabled}
                    onClick={onClick}
                    onChange={onChange}
                    value={value}
                >
                    {children}
                </FloatButton>
            </React.Fragment>
        );
    }

    if (is_green) {
        return (
            <React.Fragment>
                <GreenButton
                    disabled={is_disabled}
                    value={value}
                    {...styles}
                    onClick={onClick}
                >
                    {children}
                </GreenButton>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <ElButton
                disabled={is_disabled}
                value={value}
                {...styles}
                onClick={onClick}
            >
                {children}
            </ElButton>
        </React.Fragment>
    );
};

Button.defaultProps = {
    text: false,
    children: null,
    onClick: () => {},
    is_float: false,
    margin: false,
    width: '100%',
    height: '100%',
    padding: '12px',
    is_disabled: false,
    is_edit: false,
    abled: false,
    register: false,
    is_green: false,
};

const ElButton = styled.button`
    width: ${props => props.width};

    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    padding: ${props => props.padding};
    ${props =>
        props.is_edit
            ? props =>
                  props.abled
                      ? `background-color:${theme.color.gray5};
            color: ${theme.color.gray1};`
                      : `background-color:${theme.color.white};
            color: ${theme.color.orange};
  border: 1px solid ${theme.color.orange};
            `
            : props =>
                  props.abled
                      ? `background-color:${theme.color.orange};
            color: ${theme.color.white};`
                      : `background-color:${theme.color.red};
            color: ${theme.color.white};`}

    ${props => (props.margin ? `margin: ${props.margin};` : '')}
`;

const GreenButton = styled.button`
    width: ${props => props.width};
    padding: ${props => props.padding};
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    ${props =>
        props.is_green
            ? `background-color:${theme.color.green};
            color: ${theme.color.white};`
            : `background-color:${theme.color.gray5};
            color: ${theme.color.gray1};
            `}
    ${props => (props.margin ? `margin: ${props.margin};` : '')}
`;

const FloatButton = styled.button`
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

export default Button;
