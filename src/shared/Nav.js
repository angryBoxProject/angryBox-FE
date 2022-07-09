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
                <div>nav</div>
                <FlexDiv grow="1" column={true}>
                    <div>
                        <NavLink
                            reloadDocument
                            to="/main"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#222222',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <AiOutlineHome size="20px" />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            reloadDocument
                            to="/bamboo"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#222222',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <TiMessageTyping size="20px" />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            reloadDocument
                            to="/angrybook"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#222222',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <RiFileListLine size="20px" />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            reloadDocument
                            to="/mypage"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#222222',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <BsPerson size="20px" />
                        </NavLink>
                    </div>
                    {/* <div>
                        <NavLink
                            reloadDocument
                            to="/login"
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? '#DA463C' : '#222222',
                                fontWeight: isActive ? '800' : '400',
                            })}
                        >
                            <RiFileListLine size="20px" />
                        </NavLink>
                    </div> */}
                </FlexDiv>
            </StyledWrap>
        </>
    );
};

const StyledWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #2e2e2e;
    height: 100vh;
    width: 20%;
    padding: 120px 20px 20px;
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

export default Nav;
