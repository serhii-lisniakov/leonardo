import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import List from "@mui/material/List";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Navigation, navigation} from "../db/havigation";
import LogoHorizontal from "../assets/logo-horizontal.jpg";
import {ButtonPrimary, Container, FlexWrapper, Icon, Image, RouterLink, Section} from "./components";
import useOnClickOutside from "../hooks/useOnClickOutside";
import {Burger, Sidebar} from "./Sidebar";
import {useLocation, useMatch, useResolvedPath} from "react-router-dom";

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  button {
    justify-content: flex-start;
  }
`

const StyledIcon = styled(Icon)`
  top: -2px;
`

const StyledLogo = styled(Image)`
  height: 100%;
  max-height: 100px;
`

const FixedHeader = styled(Section)<{ isShrunk: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${({theme}) => theme.header};
  transition: all .3s;
  box-shadow: 0 -3px 10px rgba(50, 50, 50, 0.75);
  ${({isShrunk}) => isShrunk && css`
    padding: 0.2em 0;

    img {
      height: 4em;
    }
  `};
`;

export const NavLink: React.FC<Navigation> = (props) => {
    const {title, url, icon, preserveQuery} = props;
    const resolved = useResolvedPath(url);
    const match = useMatch({path: resolved.pathname, end: true});
    const {search} = useLocation();

    return (
        <ButtonPrimary key={title}>
            <RouterLink to={`${url}${preserveQuery ? search : ''}`} className={match ? 'active' : ''}>
                {icon ? <StyledIcon>{icon}</StyledIcon> : null}
                {title}
            </RouterLink>
        </ButtonPrimary>
    )
}

const Dropdown: React.FC<Navigation> = ({title, children, icon}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <FlexWrapper>
            <ButtonPrimary
                aria-describedby={title}
                onClick={handleClick}
            >
                {icon ? <StyledIcon>{icon}</StyledIcon> : null}
                {title}
                <StyledIcon>{'keyboard_arrow_down'}</StyledIcon>
            </ButtonPrimary>
            <Popover
                id={title}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <StyledList>
                    {children?.map(c => <NavLink key={c.title} {...c}/>)}
                </StyledList>
            </Popover>
        </FlexWrapper>
    )
}

export const Header: React.FC = () => {
    const [isShrunk, setShrunk] = useState(false);
    const media1100 = useMediaQuery('(max-width: 1100px)');
    const [open, setOpen] = useState(false);
    const overlay = useRef<HTMLDivElement>(null);

    useOnClickOutside(overlay, () => {
        setOpen(false);
        document.body.classList.remove('side-bar-opened');
    });

    useEffect(() => {
        const handler = () => {
            setShrunk((isShrunk) => {
                if (!isShrunk && (document.body.scrollTop > 20
                    || document.documentElement.scrollTop > 20)) {
                    return true;
                }

                if (isShrunk && document.body.scrollTop < 4
                    && document.documentElement.scrollTop < 4) {
                    return false;
                }
                return isShrunk;
            });
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const navItems = () => {
        if (media1100) {
            return <Burger open={open} setOpen={setOpen}/>;
        }

        return (<>
            {navigation.map(props => (
                props.children
                    ? <Dropdown key={props.title} {...props}/>
                    : <NavLink key={props.title} {...props}/>
            ))}
            {/*<Separator dark/>*/}
            {/*<Social/>*/}
        </>)
    }

    return (
        <>
            {media1100 &&
                <Sidebar
                    open={open}
                    overlayRef={overlay}
                    setOpen={setOpen}
                />
            }

            <FixedHeader isShrunk={isShrunk} id="header">
                <Container>
                    <FlexWrapper as='header'>
                        <RouterLink to={'/'}>
                            <StyledLogo src={LogoHorizontal} alt={'leonardo logo'}/>
                        </RouterLink>
                        <FlexWrapper as="nav">
                            {navItems()}
                        </FlexWrapper>
                    </FlexWrapper>
                </Container>
            </FixedHeader>
        </>
    )
}
