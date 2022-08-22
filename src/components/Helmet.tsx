import React from "react";
import {Helmet as Head} from "react-helmet";
import {useLocation} from "react-router-dom";
import useNavigation from "../hooks/useNavidation";

export const Helmet: React.FC = () => {
    const {pathname} = useLocation();
    const navigation = useNavigation();


    const getTitle = () => {
        const title = navigation.find(i => i.url === pathname)?.title;
        return title ? title + ' | ' : '';
    }

    return (
        <Head title={getTitle() + 'LEONARDO'}>
            <meta name="description" content="Узд кабінет LEONARDO"/>
        </Head>
    );
}
