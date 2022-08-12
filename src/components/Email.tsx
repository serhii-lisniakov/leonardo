import React, {useContext} from "react";
import {StyledLink} from "./components";
import {DBContext} from "../App";

type Props = {
    email?: string;
}


export const Email: React.FC<Props> = ({email}) => {
    const db = useContext(DBContext);

    return (
        <StyledLink href={"mailto:" + (email || db?.email)} target="_blank">{email || db?.email}</StyledLink>
    )
}
