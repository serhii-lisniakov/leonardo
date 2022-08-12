import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Landing} from "../pages/Landing";
import {Clinics} from "../pages/Clinics";
import {Doctors} from "../pages/Doctors";
import {Prices} from "../pages/Prices";
import {Booking} from "../pages/Booking";
import {Schedule} from "../pages/Schedule";

export enum QueryTypes {
    City = 'city',
}

export const useRoutes = () => {

    return (
        <Routes location={window.location}>
            <Route path="/home" element={<Landing/>}/>
            <Route path="/doctors" element={<Doctors/>}/>
            <Route path="/prices" element={<Prices/>}/>
            <Route path="/clinics" element={<>
                <Schedule/>
                <Clinics/>
            </>}/>
            <Route path="/book" element={<Booking/>}/>
            <Route path="*" element={<Navigate to="/home" replace />}/>
        </Routes>
    )
}
