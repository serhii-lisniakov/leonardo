import React, {useContext} from "react";
import {DBContext} from "../App";
import {Container, ParagraphPrimary, SectionLarge, TextPrimaryBold, Title} from "../components/components";
import styled from "styled-components";

const StyledTitle = styled(Title)`
  margin-bottom: 0.5em;
`;

export const Schedule: React.FC = () => {
    const db = useContext(DBContext);
    const {title, hours, days, comment1, comment2, comment3, comment4} = db?.schedule || {};

    const getBoldDay = (comment: string) => {
        const [day, ...rest] = comment.split('-');
        return (rest.length ? <>
            <TextPrimaryBold>{day}</TextPrimaryBold>
            -{rest.join('-')}
        </> : comment)
    }

    return (
        <SectionLarge background={'#f1ecf6'}>
            <Container>
                <Title>{title}</Title>
                <StyledTitle>{days}</StyledTitle>
                <StyledTitle as='div'>
                    {hours}
                </StyledTitle>
                {comment1 && <ParagraphPrimary>
                    {comment1}
                </ParagraphPrimary>}
                {comment2 && <ParagraphPrimary>
                    {getBoldDay(comment2)}
                </ParagraphPrimary>}
                {comment3 && <ParagraphPrimary>
                    {getBoldDay(comment3)}
                </ParagraphPrimary>}
                {comment4 && <ParagraphPrimary>
                    {comment4}
                </ParagraphPrimary>}
            </Container>
        </SectionLarge>
    )
}
