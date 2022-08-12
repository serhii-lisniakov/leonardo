import React, {useContext, useState} from "react"
import {
    Card,
    Container,
    Icon,
    ParagraphPrimary,
    Progress,
    RelativeContainer,
    SectionLarge,
    StyledLink as Link,
    Title,
    TitlePrimary
} from "../components/components";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Phone} from "../components/Phone";
import {DBContext} from "../App";
import {Socials} from "../components/Socials";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4em;
`;

const StyledLink = styled(Link)`
  font-size: 1.5em;
  display: block;
`;

const StyledCard = styled(Card)`
  display: flex;
  gap: 3em;
  justify-content: space-between;
  min-height: 300px;

  @media (max-width: 789px) {
    gap: 1em;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 10px;
  font-size: 1em !important;
`

export const Clinics: React.FC = () => {
    const [progress, setProgress] = useState(true);
    const media789 = useMediaQuery('(max-width: 789px)');
    const db = useContext(DBContext);

    const renderLink = (link: string) => (
        <StyledLink href={link} target="_blank">Показати на карті</StyledLink>
    );

    const renderSchemaLink = (link: string) => (
        <StyledLink href={link} target="_blank">Відкрити схему</StyledLink>
    );

    return (
        <SectionLarge background={'#F6ECF5'}>
            <Container>
                <Title>{db?.clinicsTitle}</Title>
                <InnerContainer>
                    {db?.clinics.map((clinic, i) => {
                        const {title, address, link, map, phone, schema} = clinic;

                        return (
                            <StyledCard key={i}>
                                <div>
                                    <TitlePrimary>
                                        <StyledIcon>{'person_pin_circle'}</StyledIcon>
                                        {title}
                                    </TitlePrimary>
                                    <div>
                                        <ParagraphPrimary>{address}</ParagraphPrimary>
                                        {!media789 && renderLink(link)}
                                        {schema && !media789 && renderSchemaLink(schema)}
                                        <ParagraphPrimary>
                                            <Phone phone={phone}/>
                                        </ParagraphPrimary>
                                        <Socials socials={clinic.socials}/>
                                    </div>
                                </div>
                                <RelativeContainer>
                                    {progress && <Progress><CircularProgress/></Progress>}
                                    {map && <iframe
                                        title="адреса клініки узд діагностики"
                                        height="100%"
                                        src={map + "&hl=uk"}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        style={{border: 'none'}}
                                        referrerPolicy="no-referrer-when-downgrade"
                                        lang='uk'
                                        onLoad={() => setProgress(false)}
                                    />}
                                </RelativeContainer>
                                {media789 && renderLink(link)}
                                {schema && media789 && renderSchemaLink(schema)}
                            </StyledCard>
                        )
                    })}
                </InnerContainer>
            </Container>
        </SectionLarge>
    );
}
