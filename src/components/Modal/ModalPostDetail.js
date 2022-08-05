import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ModalLayout from '../../Layouts/ModalLayout';

const ModalPostDetail = props => {
    const {
        close,
        title,
        modalType,
    } = props;
    
    return (
        <ModalLayout modalType={modalType} title={title} close={close}>
            ads
        </ModalLayout>
    )
};

export default ModalPostDetail;
