import React from "react";
import {StyledLink as Link} from "./components";

type Props = {
    phone: string;
}

export const Phone: React.FC<Props> = ({phone}) => (
    <Link
        href={'tel:' + phone}
        style={{
            textDecoration: 'underline',
        }}
    >
        {phone}
    </Link>
)
