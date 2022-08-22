import styled from "styled-components";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {NavLink} from "./Header";
import {useLocation} from "react-router-dom";
import {FlexWrapper, Image, RouterLink} from "./components";
import LogoHorizontal from "../assets/logo-horizontal.jpg";
import {ATTR_LOGO} from "../db/constants";
import useNavigation from "../hooks/useNavidation";

const NAVBAR_WIDTH = 300;

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  z-index: 9;

  & > div:first-child {
    display: ${({open}) => open ? 'block' : 'none'};
    background: rgba(0, 0, 0, 0.23);
    height: 100%;
    transform: translateX(-${NAVBAR_WIDTH}px);
  }
`;

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${({theme}) => theme.header};
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${NAVBAR_WIDTH}px;
  overflow-y: scroll;

  @media (max-width: 475px) {
    width: 100%;
    align-items: stretch;
  }

  > div:first-child {
    padding: 1em 0 1em 1em;

    > button { // burger
      margin: 0 1.5em;
    }
  }

  button.MuiButton-root {
    display: block;
    font-size: 2rem !important;
    justify-content: stretch;
    padding: 0.2em 0.5em;
    border-bottom: 1px solid ${({theme}) => theme.colorPrimary};
  }
`;

const StyledBurger = styled.button<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  min-height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  position: relative;
  margin-left: 3em;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({theme}) => theme.colorPrimary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({open}) => open ? '0' : '1'};
      transform: ${({open}) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const StyledLogo = styled(Image)`
  height: 100%;
  max-height: 100px;
`

type BurgerProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}


export const Burger: React.FC<BurgerProps> = ({open, setOpen}) => {

    const toggle = () => {
        setOpen(!open);
        document.body.classList.toggle('side-bar-opened')
    }

    return (
        <StyledBurger open={open} onClick={toggle}>
            <div/>
            <div/>
            <div/>
        </StyledBurger>
    )
}

type SidebarProps = {
    overlayRef: any;
} & BurgerProps;

export const Sidebar: React.FC<SidebarProps> = ({open, overlayRef, setOpen}) => {
    const location = useLocation();
    const navigation = useNavigation();

    useEffect(() => {
        setOpen(false);
        document.body.classList.remove('side-bar-opened');
    }, [location, setOpen]);

    return (
        <Overlay open={open}>
            <div ref={overlayRef}/>
            <StyledMenu>
                <FlexWrapper>
                    <RouterLink to={'/'}>
                        <StyledLogo src={LogoHorizontal} alt={ATTR_LOGO}/>
                    </RouterLink>
                    <Burger open={open} setOpen={setOpen}/>
                </FlexWrapper>

                {navigation.map(item => (
                    item.children
                        ? item.children.map(child => <NavLink key={child.title} {...child}/>)
                        : <NavLink key={item.title} {...item} />
                ))}

            </StyledMenu>
        </Overlay>
    )
}
