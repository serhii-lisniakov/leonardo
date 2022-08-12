import React, {useContext} from "react"
import {ButtonGrant, Container, FlexWrapperCenter, Section} from "./components";
import {DBContext} from "../App";

type Props = {
    dark?: boolean;
    submit: any;
}

export const Book: React.FC<Props> = ({dark, submit}) => {
    const db = useContext(DBContext);

    return (
        <Section background={dark ? '#0C3C64' : 'white'}>
            <Container>
                <FlexWrapperCenter>
                    <ButtonGrant
                        background={dark ? '' : '#0C3C64'}
                        onClick={() => submit()}>
                        {db?.book}
                    </ButtonGrant>
                </FlexWrapperCenter>
            </Container>
        </Section>
    );
}
