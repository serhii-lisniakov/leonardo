export type Price = {
    title: string;
    price?: number;
    prices?: Price[];
}

export type Doctor = {
    id: number;
    name: string;
    title: string;
    avatar: string;
}

export type Device = {
    title: string;
    name: string;
}

export type Social = {
    facebook: string;
    instagram: string;
}

export interface Clinic {
    title: string;
    address: string;
    phone: string;
    devices: Device[];
    pricesLink: string;
    prices: Price[];
    doctors: Doctor[];
    link: string;
    map: string;
    socials: Social;
    schema: string;
    email: string;
}

export type Schedule = {
    title: string;
    days: string;
    hours: string;
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
}

export type Direction = {
    title: string;
    link: string;
}

export type DB = {
    mainBanner: string;
    email: string;
    aboutTitle: string;
    aboutBody: string;
    aboutBanner: string;
    benefitsTitle: string;
    benefitsBody: string[];
    clinicsTitle: string;
    directionsTitle: string;
    directions: Direction[];
    licence: string;
    book: string;
    pricesTitle: string;
    devicesTitle: string;
    clinics: Clinic[];
    schedule: Schedule;
}
