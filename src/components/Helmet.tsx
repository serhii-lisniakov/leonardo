import React from "react";
import {Helmet as Head} from "react-helmet";
import {useLocation} from "react-router-dom";
import {navigation} from "../db/havigation";

export const Helmet: React.FC = () => {
    const {pathname} = useLocation();

    const getTitle = () => {
        const title = navigation.find(i => i.url === pathname)?.title;
        return title ? title + ' | ' : '';
    }

    return (
        <Head title={getTitle() + 'LEONARDO'}>
            <meta name="description" content="Вартість послуг LEONARDO"/>
        </Head>
    );
}
