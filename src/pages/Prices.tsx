import React, {useContext, useEffect} from "react"
import {
    ButtonPrimary,
    Card,
    Container,
    Highlight,
    Icon,
    ParagraphPrimary,
    Section,
    Separator,
    TextPrimary,
    TextPrimaryBold,
    Title
} from "../components/components";
import {CitySelector} from "../components/CitySelector";
import {useSearchParams} from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams";
import {QueryTypes} from "../hooks/useRoutes";
import styled, {css} from "styled-components";
import {Search} from "../components/Search";
import {Clinic, Price} from "../db/types";
import {ClinicInfo} from "../components/ClinicInfo";
import {DBContext} from "../App";

const StyledCard = styled(Card)`
  padding: 1em;
  margin: 2em 0;
`;

const Item = styled.div`
  padding: 0.5em 2em;
  font-size: 0.875em;
  display: flex;
  gap: 1em;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  word-break: break-word;
  text-transform: uppercase;
`;

const Group = styled(Item)`
  background: ${({theme}) => theme.colorPrimary};
  font-size: 1.125em;
  color: white;
`;

const StyledItemPrice = styled(Item)<{ isGroup?: boolean; isGroupHeader?: boolean }>`
  &:nth-child(odd) {
    background: ${({theme}) => theme.colorSecondary}
  }

  &:last-child {
    margin-bottom: 2em;
  }

  ${({isGroupHeader}) => isGroupHeader && css`
    text-decoration: underline;
  `}
  ${({isGroup}) => isGroup && css`
    padding-left: 4em;
  `}
`;

const DevicesWrapper = styled(ParagraphPrimary)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 33%));
  gap: 1em;

  > span:nth-child(even) {
    padding-bottom: 0.5em;
    border-bottom: 1px solid ${({theme}) => theme.colorSecondary};
  }
`;

export const Prices: React.FC = () => {
    const [city, setCity] = React.useState<string>('');
    const [data, setData] = React.useState<Clinic | null>(null);
    const [prices, setPrices] = React.useState<Price[]>([]);
    const [search, setSearch] = React.useState<string>('');
    const [cityParam] = useSearchParams();
    const db = useContext(DBContext);

    useQueryParams(cityParam, () => {
        setCity(cityParam.get(QueryTypes.City) || '');
    })

    useEffect(() => {
        const clinic = db?.clinics.find(c => c.title === city);
        setData(clinic || null);
        setPrices(clinic?.prices || []);
    }, [city])

    useEffect(() => {
        if (!data) {
            return;
        }
        const filtered = data.prices?.map(group => ({
            ...group,
            prices: group.prices?.filter(p => p.title?.toString().toLowerCase()?.includes(search.toLowerCase()))
        }))
        setPrices(filtered);
    }, [data, search])

    const highlightText = (text: string) => {
        if (!text) {
            return;
        }
        text = text.toString();
        const index = text.toLowerCase().indexOf(search.toLowerCase());
        if (index >= 0) {
            return (<>
                {text.substring(0, index)}
                <Highlight>{text.substring(index, index + search.length)}</Highlight>
                {text.substring(index + search.length)}
            </>);
        }
        return <>text</>;
    }

    const ItemPrice = ({title, price, prices, isGroup}: Price & { isGroup?: boolean }) => (<>
        <StyledItemPrice isGroup={!!isGroup} isGroupHeader={!!prices?.length}>
            {!!isGroup && <Icon>{'scatter_plot'}</Icon>}
            <TextPrimary>{highlightText(title)}</TextPrimary>
            <Separator style={{marginLeft: 'auto'}} dark={true}/>
            <TextPrimary style={{minWidth: '60px', textAlign: 'center'}}>{price}</TextPrimary>
        </StyledItemPrice>
        {prices?.map((item, i) => <ItemPrice key={i} {...item} isGroup={true}/>)}
    </>)

    const Devices = () => {
        if (!data || !data?.devices?.length) {
            return null;
        }

        return (
            <StyledCard>
                <Title>{db?.devicesTitle}</Title>
                <DevicesWrapper>
                    {data.devices.map(({title, name}, i) => (
                        <React.Fragment key={i}>
                            <TextPrimary>{title}</TextPrimary>
                            <TextPrimaryBold>{name}</TextPrimaryBold>
                        </React.Fragment>
                    ))}
                </DevicesWrapper>
            </StyledCard>
        )
    }

    const Download = () => {
        if (!data || !data?.pricesLink) {
            return null;
        }
        const open = async () => {
            window.open(data.pricesLink, '_blank');
        }

        return (
            <ParagraphPrimary>
                <ButtonPrimary onClick={() => open()}>
                    Завантажити <Icon>{'download'}</Icon>
                </ButtonPrimary>
            </ParagraphPrimary>
        )
    }

    return (
        <>
            <CitySelector/>
            <Section>
                <Container>
                    <Title>{db?.pricesTitle}</Title>
                    {data && (<>
                        <ClinicInfo {...data}/>
                        <Download/>
                        <Search value={search} setSearch={setSearch}/>
                    </>)}
                    {prices && prices.map(({title, prices}, i) => {
                        return !prices?.length
                            ? null
                            : (
                                <React.Fragment key={i}>
                                    <Group>{title}</Group>
                                    {prices?.map((item, i) => (
                                        <ItemPrice key={i} {...item}/>
                                    ))}
                                </React.Fragment>
                            )
                    })}
                    <Devices/>
                </Container>
            </Section>
        </>
    );
}
