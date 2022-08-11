import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { RiFileListLine } from 'react-icons/ri';
import { TiMessageTyping } from 'react-icons/ti';
import { BsPerson } from 'react-icons/bs';

const Nav = props => {
    return (
        <>
            <StyledWrap>
                <NavLogoBox>ANGRY BANK</NavLogoBox>
                <FlexDiv grow="1" column={true}>
                    <IconWrapBox>
                        <NavLink
                            reloadDocument
                            to="/main"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#747474',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <AiOutlineHome size="27px" />
                        </NavLink>
                    </IconWrapBox>
                    <IconWrapBox>
                        <NavLink
                            reloadDocument
                            to="/bamboo"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#747474',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <TiMessageTyping size="27px" />
                        </NavLink>
                    </IconWrapBox>
                    <IconWrapBox>
                        <NavLink
                            reloadDocument
                            to="/angrybook"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#747474',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <RiFileListLine size="27px" />
                        </NavLink>
                    </IconWrapBox>
                    <IconWrapBox>
                        <NavLink
                            reloadDocument
                            to="/mypage"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#747474',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <BsPerson size="27px" />
                        </NavLink>
                    </IconWrapBox>
                    {/* <IconWrapBox>

                        <NavLink
                            reloadDocument
                            to="/login"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#747474',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <RiFileListLine size="27px"/>
                        </NavLink>

                    </IconWrapBox>  */}
                </FlexDiv>
            </StyledWrap>
        </>
    );
};

const StyledWrap = styled.div`
    background-color: #2e2e2e;
    height: 100vh;
    width: 100%;
    max-width: 22vw;
    padding: 34px 8px 50px 5vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 98;
    transition: all 0.2s ease-in-out;
`;
const FlexDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${props => (props.column ? 'column' : 'row')};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    padding: ${props => props.padding};
    flex-grow: ${props => props.grow};
`;

const NavLogoBox = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    color: #DA463C;
`;

const IconWrapBox = styled.div`
    margin-top: 40px;
`;

export default Nav;
