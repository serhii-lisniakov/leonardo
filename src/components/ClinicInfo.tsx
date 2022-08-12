import React from "react";
import {Card, Icon, ParagraphPrimary, TextPrimaryBold} from "./components";
import {Phone} from "./Phone";
import {Email} from "./Email";
import styled from "styled-components";
import {Clinic} from "../db/types";

const StyledCard = styled(Card)`
  padding: 1em;
  margin: 2em 0;
`;

export const ClinicInfo: React.FC<Clinic> = ({title, address, phone, email}) => {
    return (
        <StyledCard>
            <TextPrimaryBold>
                <ParagraphPrimary>
                    <Icon>{'person_pin_circle'}</Icon>
                    {title} | {address}
                </ParagraphPrimary>
                <ParagraphPrimary>
                    <Phone phone={phone}/> | <Email email={email}/>
                </ParagraphPrimary>
            </TextPrimaryBold>
        </StyledCard>
    )
}
