import React, { useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import styled from 'styled-components';

import Notifications from './Notifications';
const Header = props => {
    const [notimmodal, setNotimodal] = useState(false);

    return (
        <>
            <div className="flex justify-end h-20">
                <div>
                    <BsFillBellFill
                        size="20px"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setNotimodal(true);
                            console.log('알림');
                        }}
                    />
                </div>
                <div>프로필 url</div>
            </div>
            {notimmodal && <Notifications setNotimodal={setNotimodal} />}
        </>
    );
};

export default Header;
