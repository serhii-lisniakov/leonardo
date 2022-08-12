import React, {useContext} from "react"
import {Container, Icon, Paragraph, SectionLarge, Title} from "../components/components";
import styled from "styled-components";
import {DBContext} from "../App";

const StyledContainer = styled(Container)`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Benefit = styled(Paragraph)`
  display: inline-flex;
  padding: 0.5em;
  gap: 1em;
  width: fit-content;
  margin: 0;
  align-items: center;

  &:nth-child(odd) {
    transform: rotate(0.1deg);
  }

  &:nth-child(odd) {
    transform: rotate(-0.1deg);
  }
`;

export const Benefits: React.FC = () => {
    const db = useContext(DBContext);

    return (
        <SectionLarge background={'linear-gradient(90deg, #0c2a42, #0C3C64 35% 65%, #0c2a42)'}>
            <StyledContainer as='ul'>
                <Title>{db?.benefitsTitle}</Title>
                {db?.benefitsBody.map((b, i) => (
                    <Benefit key={i} as='li'>
                        <Icon>{'done'}</Icon>
                        {b}
                    </Benefit>
                ))}
            </StyledContainer>
        </SectionLarge>
    );
}
