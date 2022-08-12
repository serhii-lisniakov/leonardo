import React, {useContext, useState} from "react"
import {Card, Container, Image, ParagraphPrimary, Progress, SectionLarge, TitlePrimary} from "../components/components";
import styled from "styled-components";
import {DBContext} from "../App";
import CircularProgress from "@mui/material/CircularProgress";

const StyledCard = styled(Card)`
  display: flex;
  gap: 4em;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    padding: 2em;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  flex: 0 0 480px;

  @media (max-width: 1100px) {
    flex: auto;
  }
`;

export const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const db = useContext(DBContext);

    return (
        <SectionLarge background={'#B0BDDD'}>
            <Container>
                <StyledCard>
                    {db?.aboutBanner && <BannerWrapper>
                        {loading && <Progress><CircularProgress/></Progress>}
                        <Image src={db?.aboutBanner} alt="узд діагностика" onLoad={() => setLoading(false)}/>
                    </BannerWrapper>}
                    <div>
                        <TitlePrimary>{db?.aboutTitle}</TitlePrimary>
                        <ParagraphPrimary>{db?.aboutBody}</ParagraphPrimary>
                    </div>
                </StyledCard>
            </Container>
        </SectionLarge>
    );
}
