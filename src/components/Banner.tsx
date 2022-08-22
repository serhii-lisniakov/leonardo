import React, {useState} from "react";
import {Container, Image, Progress, Section} from "./components";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {ATTR_ALT} from "../db/constants";

const StyledSection = styled(Section)`
  padding: 0;
  margin: 0 0 -4px;
  text-align: center;

  img {
    max-height: 400px;
    object-fit: cover;
  }
`;

const StyledContainer = styled(Container)`
  @media (max-width: 1280px) {
    padding: 0;
  }

  --swiper-navigation-size: 2em;
  --swiper-navigation-color: ${({theme}) => theme.colorPrimary};
  --swiper-pagination-color: ${({theme}) => theme.colorPrimary};
`;

type ItemProps = {
    banner: string;
}

type BannerProps = {
    banners: string[];
}

const Item: React.FC<ItemProps> = ({banner}) => {
    const [loading, setLoading] = useState(true);

    return (
        <article>
            {/*TODO separate all pictures with progress in component*/}
            {loading && <Progress><CircularProgress/></Progress>}
            <Image src={banner} alt={ATTR_ALT} onLoad={() => setLoading(false)}/>
        </article>
    )
}

export const Banner: React.FC<BannerProps> = ({banners}) => {

    const renderBanners = () => {
        return banners.map((item, i) => <SwiperSlide key={i}><Item banner={item}/></SwiperSlide>);
    }

    return (
        <StyledSection>
            <StyledContainer>
                <Swiper
                    effect={"fade"}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, EffectFade, Pagination, Navigation]}
                >
                    {renderBanners()}
                </Swiper>
            </StyledContainer>
        </StyledSection>
    );
}
