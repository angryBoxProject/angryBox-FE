import { css } from 'styled-components'; // eslint-disable-line no-unused-vars

const calRem = size => `${size / 16}rem`;

const fontSize = {
    12: calRem(12),
    14: calRem(14),
    18: calRem(18),
    20: calRem(20),
    30: calRem(30),
    40: calRem(40),

    //모바일 폰트
    11: calRem(11),
    16: calRem(16),
    22: calRem(22),
    28: calRem(28),
};

const fontWeight = {
    extraBold: 800,
    semiBold: 600,
    regular: 400,
};

const color = {
    // 가장 진한 색이 1이며, 숫자가 커질수록 점점 옅은 색으로 셋팅해두었습니다.
    gray1: '#5A5A5A',
    gray2: '#8C8C8C',
    gray3: '#C4C4C4',
    gray4: '#9E9E9E',
    gray5: '#E9E9E9',
    orange: '#F84914',
    green: '#2DBEB1',
    black: '#292929',
    realblack: '#000000',
    white: '#fff',
    BackGround: '#363F4E',
    mainBlue: '#5327ff',
    mainMint: '#83ffca',
    mainGray: '#dedfe0',
    mint: '#bcffe2',
    blue1: '#8689ff',
    blue2: '#afb1ff',
    blue3: '#d8d9ff',
    red: '#DA463C',

    darkLine: '#3F4448',
    danger: '#ff8b6f',
};
const deviceSizes = {
    mobile: '375px',
    tablet: '768px',
    laptop: '1024px',
};

const device = {
    mobile: `screen and (min-width: ${deviceSizes.mobile})`,
    tablet: `screen and (min-width: ${deviceSizes.tablet})`,
    laptop: `screen and (min-width: ${deviceSizes.laptop})`,
};

const theme = {
    fontSize,
    fontWeight,
    color,
    calRem,
    device,
};

export default theme;
