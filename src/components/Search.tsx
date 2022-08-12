import {ParagraphPrimary} from "./components";
import TextField from "@mui/material/TextField";
import React, {Dispatch, SetStateAction} from "react";
import {TextFieldProps} from "@mui/material/TextField/TextField";

type Props = {
    setSearch: Dispatch<SetStateAction<string>>;
}

export const Search: React.FC<Props & TextFieldProps> = ({value, setSearch, placeholder}: any) => (
    <ParagraphPrimary as='div'>
        <TextField
            fullWidth
            placeholder={placeholder || "Пошук"}
            value={value}
            onChange={({target: {value}}) => setSearch(value)}
            inputProps={{
                autoComplete: 'new-password',
                form: {
                    autocomplete: 'off',
                },
            }}
        />
    </ParagraphPrimary>
);
