import React, {useContext} from "react"
import {Container, Paragraph, SectionLarge, StyledLink, Title} from "../components/components";
import {DBContext} from "../App";

export const Directions: React.FC = () => {
    const db = useContext(DBContext);

    return (
        <SectionLarge>
            <Container>
                <Title>{db?.directionsTitle}</Title>
                {db?.directions.map((d, i) => (
                    <Paragraph key={i}>
                        <StyledLink href={`/prices?city=${d.link}`}>{d.title}</StyledLink>
                    </Paragraph>
                ))}
            </Container>
        </SectionLarge>
    );
}
