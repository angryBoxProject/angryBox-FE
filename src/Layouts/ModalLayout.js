import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Close } from '../static/image/ModalClose.svg';

const ModalLayout = props => {
    const {
        modalType = "info", //info, form, list
        title = "",
        close,
        children,
    } = props;

    return (
        <>
            <Blur onClick={close}></Blur>
            <ModalInner modalType={modalType}>
                {title && <ModalTitle modalType={modalType}>{title}</ModalTitle>}
                <ModalClose modalType={modalType} onClick={close}>
                    <Close />
                </ModalClose>
                {children}
            </ModalInner>
        </>
    )
}
const Blur = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #282828;
    opacity: 0.8;
    z-index: 10;
`
const ModalInner = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: ${props => props.modalType === "form" ? "1285px" : props.modalType === "list" ? "984px" : "890px"};
    height: auto;
    max-height: 820px;
    background: #F6F6F6;
    padding: ${props => props.modalType === "list" ? "38px 68px" : "38px 40px"};
    z-index: 10;
`
const ModalTitle = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    color: #282828;
    margin-bottom: ${props => props.modalType === "list" ? "52px" : "20px"};
`
const ModalClose = styled.div`
    position absolute;
    top: 40px;
    right: ${props => props.modalType === "list" ? "68px" : "40px"};
    cursor: pointer;
`

export default ModalLayout;