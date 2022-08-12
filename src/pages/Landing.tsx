import React, {useContext} from "react"
import {useNavigate} from 'react-router-dom';
import {Home} from "./Home";
import {Benefits} from "./Benefits";
import {Clinics} from "./Clinics";
import {Directions} from "./Directions";
import {Book} from "../components/Book";
import {Booking} from "./Booking";
import {DBContext} from "../App";
import {Banner} from "../components/Banner";

export const Landing: React.FC = () => {
    const db = useContext(DBContext);
    const navigate = useNavigate();

    const goToBooking = () => {
        navigate('/book');
    }

    return (
        <>
            {db?.mainBanner && <Banner banner={db?.mainBanner}/>}
            <Home/>
            <Book submit={goToBooking}/>
            <Benefits/>
            <Directions/>
            <Clinics/>
            <Booking/>
        </>
    );
}
