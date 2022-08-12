import React from "react"
import {FlexWrapper, FlexWrapperCenter, StyledLink} from "./components";
import styled from "styled-components";
import theme from "../styles/theme";
import {Social} from "../db/types";

const StyledFlexWrapper = styled(FlexWrapper)`
  justify-content: flex-start;

  @media (max-width: 789px) {
    justify-content: center;
  }
`

const StyledSvg = styled.svg`
  fill: ${({theme}) => theme.colorPrimary};
  width: 3em;
  height: 3em;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

type Props = {
    socials: Social;
}

export const Socials: React.FC<Props> = ({socials}) => {
    return (
        <StyledFlexWrapper>
            {socials?.facebook && <StyledLink href={socials.facebook} target='_blank'>
                <StyledSvg
                    width="100%"
                    height="100%"
                    viewBox="0 0 2778 2778"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <StyledSvg as="path"
                                   d="M2026.92,657.814L758.251,657.814C714.778,657.814 679.545,693.047 679.545,736.52L679.545,2005.19C679.545,2048.66 714.778,2083.9 758.251,2083.9L1441.26,2083.9L1441.26,1531.64L1255.41,1531.64L1255.41,1316.42L1441.26,1316.42L1441.26,1157.7C1441.26,973.503 1553.76,873.205 1718.07,873.205C1796.79,873.205 1864.43,879.062 1884.14,881.68L1884.14,1074.18L1770.18,1074.23C1680.82,1074.23 1663.51,1116.69 1663.51,1179.01L1663.51,1316.42L1876.64,1316.42L1848.89,1531.64L1663.51,1531.64L1663.51,2083.9L2026.92,2083.9C2070.39,2083.9 2105.62,2048.66 2105.62,2005.19L2105.62,736.52C2105.62,693.047 2070.39,657.814 2026.92,657.814"/>
                    </g>
                </StyledSvg>
            </StyledLink>}
            {socials?.instagram && <StyledLink href={socials.instagram} target='_blank'>
                <StyledSvg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 500"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <circle cx="325.614" cy="175.339" r="16.429"
                                fill={theme.colorPrimary}/>
                        <circle cx="249.883" cy="250.918" r="59.767"
                                fill="none" stroke={theme.colorPrimary}
                                strokeWidth='25px'/>
                        <path
                            d="M377.145,187.547C377.145,152.546 348.729,124.131 313.729,124.131L186.898,124.131C151.897,124.131 123.482,152.546 123.482,187.547L123.482,314.564C123.482,349.564 151.897,377.98 186.898,377.98L313.729,377.98C348.729,377.98 377.145,349.564 377.145,314.564L377.145,187.547Z"
                            fill="none"
                            stroke={theme.colorPrimary}
                            strokeWidth='25px'
                        />
                    </g>
                </StyledSvg>
            </StyledLink>}
        </StyledFlexWrapper>
    );
}
