import React, {useState} from "react";
import {Image, Progress, Section} from "./components";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const StyledSection = styled(Section)`
  padding: 0;
  margin: 0 0 -4px;
  text-align: center;
  
  img {
    max-height: 400px;
    object-fit: cover;
  }
`;

type Props = {
    banner: string;
}

export const Banner: React.FC<Props> = ({banner}) => {
    const [loading, setLoading] = useState(true);

    return (
        <StyledSection>
            {loading && <Progress><CircularProgress/></Progress>}
            <Image src={banner} alt="узд діагностика" onLoad={() => setLoading(false)}/>
        </StyledSection>
    );
}
