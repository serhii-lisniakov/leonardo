import {useContext} from "react";
import {DBContext} from "../App";
import {Navigation, navigation} from "../db/havigation";

function useNavigation(): Navigation[] {
    const {admin} = useContext(DBContext) || {};

    return navigation.map(item => {
        // @ts-ignore
        item.title = admin?.navigation[item.url.split('/')[1]] || item.title;
        return item;
    })
}

export default useNavigation;
