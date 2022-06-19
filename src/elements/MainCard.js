import React from 'react';
// import Icon from '../Icons/Icon';
import tw from 'tailwind-styled-components';

// const MainCard = tw.div`
//     m-2 rounded flex flex-col
//     border-y-yellow-200  pointer-events-none
//     ${(props) => (props.size === "1" ? `w-c01 h-c01` : "")};
//     ${(props) => (props.size === "2" ? `w-c02 h-c02` : "")};
//     ${(props) => (props.size === "3" ? `w-c05 h-c02 bg-red-500 shadow-md` : "")};
//     ${(props) => (props.size === "4" ? `w-c04 h-c04` : "")};
//     ${(props) => (props.size === "5" ? `w-[18.75rem] h-[22.813rem]` : "")};
//     ${(props) => (props.size === "6" ? `w-c06 h-c06` : "")};
//     ${(props) => (props.size === "7" ? `w-[32.5rem] h-[18.75rem]` : "")};
// `;

const MainCard = (props) => {
    const { clickCard } = props;
    return (
        <div onClick={clickCard} className="pointer-events-auto m-2 rounded flex flex-col border-y-yellow-200 pointer-events-none w-[18.75rem] h-[18.75rem] bg-red-500"></div>
    )
}

export default MainCard;