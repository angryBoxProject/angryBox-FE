import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';



import MainLayout from '../../Layouts/MainLayout';
import Contents from '../../Layouts/Contents';
import { style } from '@mui/system';

const Main = () => {
    
    return (
            <MainLayout nav={true}>
                <Contents header={true}>
                    <div style={{color: "#000"}}>123234</div>
                </Contents>
            </MainLayout>

    );
};


export default Main;
