import React, {useContext} from "react";
import {useSearchParams} from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {Container, Section} from "./components";
import {QueryTypes} from "../hooks/useRoutes";
import useQueryParams from "../hooks/useQueryParams";
import {DBContext} from "../App";

export const CitySelector: React.FC = () => {
    const [city, setCity] = React.useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const db = useContext(DBContext);

    const handleChange = ({target: {value}}: SelectChangeEvent<typeof city>) => {
        setCity(value as string);
        setSearchParams({[QueryTypes.City]: value});
    };

    useQueryParams(searchParams, () => {
        setCity(searchParams.get(QueryTypes.City) || '')
    })

    return (
        <Section background={'linear-gradient(90deg, #FAF8F6, #f8e6d4 35% 65%, #FAF8F6)'}>
            <Container>
                <Select
                    value={city}
                    onChange={handleChange}
                    fullWidth
                    displayEmpty
                    renderValue={(value) => value ? value : <em>{db?.admin.chooseAddress}</em>}
                >
                    {db?.clinics.map((c, i) => (
                        <MenuItem value={c.title} key={i}>{c.title}</MenuItem>
                    ))}
                </Select>
            </Container>
        </Section>
    );
}
