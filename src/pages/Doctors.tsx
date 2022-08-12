import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {Card, Container, FlexWrapper, Progress, Section, TextPrimary, Title} from "../components/components";
import {CitySelector} from "../components/CitySelector";
import {ClinicInfo} from "../components/ClinicInfo";
import {Clinic, Doctor} from "../db/types";
import useQueryParams from "../hooks/useQueryParams";
import {QueryTypes} from "../hooks/useRoutes";
import {DBContext} from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import AvatarPlaceholder from "../assets/avatar-placeholder.svg";

const Wrapper = styled(FlexWrapper)`
  padding: 0;
  display: grid;
  gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
  align-items: stretch;
  justify-content: stretch;
`;

const StyledCard = styled(Card)`
  padding: 0;
  cursor: pointer;
  position: relative;
  text-align: center;

  &:hover {
    box-shadow: 0 6px 15px 2px rgba(0, 0, 0, 0.5);
  }

  & > button:first-child {
    flex-direction: column;
    padding: 0;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: top;
`;

const DoctorTitle = styled(Title)`
  padding: 1em;
  font-size: 1.2em;
  margin-bottom: 0;

  & + div {
    padding: 0 1em 1em;
    font-size: 1em !important;
  }
`;

const DoctorCard: React.FC<Doctor> = ({name, avatar, title}) => {
    const [loading, setLoading] = useState(true);

    return (
        <StyledCard>
            {loading && <Progress><CircularProgress/></Progress>}
            <Avatar
                height="400px"
                src={avatar || AvatarPlaceholder}
                alt={title}
                title={title}
                onLoad={() => setLoading(false)}
            />
            <DoctorTitle>{name}</DoctorTitle>
            <TextPrimary as='div'>{title}</TextPrimary>
        </StyledCard>
    );
}

export const Doctors: React.FC = () => {
    const [city, setCity] = React.useState<string>('');
    const [data, setData] = React.useState<Clinic | null>(null);
    const [doctors, setDoctors] = React.useState<Doctor[] | undefined>([]);
    const [cityParam] = useSearchParams();
    const db = useContext(DBContext);

    useQueryParams(cityParam, () => {
        setCity(cityParam.get(QueryTypes.City) || '');
    })

    const getAll = () => {
        const array = db?.clinics.map(i => i.doctors).filter(i => i).flat() || [];
        return Array.from(new Map(array.map(item => [item.avatar + item.name + item.title, item])).values());
    }

    useEffect(() => {
        const clinic = db?.clinics.find(c => c.title === city);
        setData(clinic || null);
        setDoctors(city ? clinic?.doctors || [] : getAll());
    }, [city])

    return (
        <>
            <CitySelector/>
            <Section background={'#B0BDDD'}>
                <Container>
                    {data && <ClinicInfo {...data}/>}
                    <Wrapper>
                        {doctors && doctors.map((d, i) => (
                            <DoctorCard {...d} key={i}/>
                        ))}
                    </Wrapper>
                </Container>
            </Section>
        </>
    );
}
