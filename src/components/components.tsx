import styled from "styled-components";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import {Icon as MUIIcon} from "@mui/material";

export const Section = styled.article<{
    background?: string;
    fixed?: boolean;
}>`
  padding: 1em 0;
  background: ${({background}) => background};
`;

export const SectionLarge = styled(Section)`
  padding: 6em 0;

  @media (max-width: 1100px) {
    padding: 3em 0;
  }
`;

export const Container = styled.div`
  color: ${({theme}) => theme.colorPrimary};
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5em;
  position: relative;
  
  .MuiInput-input {
    min-height: 1.4375em !important;
  }
  
  .MuiInput-root,
  .Mui-focused,
  .MuiInputLabel-root {
    color: currentColor !important;
  }

  .MuiInput-root:after,
  .MuiInput-root:before,
  fieldset {
    border-color: currentColor !important;
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
`;

export const ButtonPrimary = styled(Button)`
  color: ${({theme}) => theme.colorPrimary} !important;
  font-weight: 500;
  font-size: 1em !important;
  min-width: auto !important;
`;

export const ButtonGrant = styled(ButtonPrimary)<{background?: string}>`
  background: ${({background}) => background ? background : 'white'} !important;
  color: ${({theme, background}) => background ? 'white' : theme.colorPrimary} !important;
  font-size: 2em !important;
  padding: 0.5em 1em !important;
`;

export const RouterLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5em;

  &.active + span {
    background: rgba(25, 118, 210, 0.2);
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: 1em;
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FlexWrapperCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.article<{ background?: string; }>`
  background: ${({background}) => background || 'white'};
  padding: 3em;
  border-radius: 0.5em;
  box-shadow: 0 3px 15px -4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const Icon = styled(MUIIcon)`
  position: relative;
  color: inherit;
  top: 2px;
`;

export const Separator = styled.span<{ dark?: boolean }>`
  display: inline-block;
  margin: 0 1em;
  height: 2em;
  width: 1px;
  background: ${({theme, dark}) => dark ? theme.colorPrimary : 'white'};
`;

export const Title = styled.h2`
  margin: 0 0 1em;
  color: inherit;
  font-size: 2em;
`;

export const TitlePrimary = styled(Title)`
  color: ${({theme}) => theme.colorPrimary};
`;

export const Text = styled.span`
  color: white;
`;

export const TextPrimary = styled.span`
  color: ${({theme}) => theme.colorPrimary};
`;

export const TextPrimaryBold = styled.span`
  font-weight: bold;
`;

export const Highlight = styled(TextPrimary)`
  background: yellow;
`;

export const Paragraph = styled.p`
  margin: 1em 0;
  color: inherit;
  white-space: break-spaces;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ParagraphPrimary = styled(Paragraph)`
  color: ${({theme}) => theme.colorPrimary};

  &:first-child {
    margin-top: 0;
  }
`;

export const Progress = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
