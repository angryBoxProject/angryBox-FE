import React from 'react';
const Header = props => {
    const { title } = props;
    return (
        <>
            <div className="flex justify-end h-20">
                <div>{title}</div>
                <div>프로필 url</div>
            </div>
        </>
    );
};

export default Header;
