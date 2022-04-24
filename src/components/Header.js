import React, { useEffect, useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useIsMount from '../hooks/useIsMount';
import { getnotis } from '../redux/modules/notification';

import Notifications from './Notifications';

const Header = props => {
    const [notimmodal, setNotimodal] = useState(false);
    const dispatch = useDispatch();
    const lastnotiId = useSelector(state => state.noti.lastnotiId);

    return (
        <>
            <div className="flex justify-end h-20">
                <div>
                    <BsFillBellFill
                        size="20px"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setNotimodal(true);
                        }}
                    />
                </div>
                <div>프로필 url</div>
            </div>
            {notimmodal && (
                <Notifications
                    notimmodal={notimmodal}
                    setNotimodal={setNotimodal}
                    lastnotiId={lastnotiId}
                />
            )}
        </>
    );
};

export default Header;
