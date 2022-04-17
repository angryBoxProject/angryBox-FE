import React from 'react';
const Header = props => {
    const { title } = props;
    return (
        <>
            <div className="flex justify-end">
                <div>{title}</div>
                <div>{title}</div>
            </div>
        </>
    );
};

export default Header;
