import React, {useContext} from "react"
import {Container, FlexWrapper, Icon, SectionLarge, Separator, Text} from "./components";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Email} from "./Email";
import {DBContext} from "../App";

const StyledFlexWrapper = styled(FlexWrapper)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1em;
    align-items: center;

    > div {
      flex-direction: column;
    }
  }
`

export const Footer: React.FC = () => {
    const media768 = useMediaQuery('(max-width: 768px)');
    const db = useContext(DBContext);

    return (
        <SectionLarge background={'#0C3C64'}>
            <Container>
                <StyledFlexWrapper>
                    <FlexWrapper>
                        {!media768 && (<>
                            <Text><Icon>{'mail'}</Icon></Text>
                            <Separator/>
                        </>)}
                        <Text><Email/></Text>
                    </FlexWrapper>
                    <FlexWrapper>
                        <Text>{db?.licence}</Text>
                        {!media768 && <Separator/>}
                        <Text>{new Date().getFullYear()}</Text>
                    </FlexWrapper>
                </StyledFlexWrapper>
            </Container>
        </SectionLarge>
    );
}
