import React, {useContext, useState} from "react";
import emailjs from '@emailjs/browser';
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputMask from "react-input-mask";
import FormControl from '@mui/material/FormControl';
import {Container, FlexWrapper, Progress, SectionLarge, Title} from "../components/components";
import {Book} from "../components/Book";
import styled from "styled-components";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import {DBContext} from "../App";

const StyledForm = styled(FlexWrapper)`
  flex-direction: column;
  gap: 2em;
  color: white;
  width: 50%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
  }

  .MuiInputBase-input.MuiInput-input {
    font-size: 26px;
  }
  
  .MuiSvgIcon-root {
    color: inherit;
  }
`;

const Message = styled.div<{ success: boolean }>`
  position: absolute;
  bottom: -5.8em;
  color: ${({success}) => success ? 'green' : 'red'};
`;

const initialState = {
    name: '',
    phone: '',
    clinic: '',
    message: '',
}

const initialErrors = {
    name: false,
    phone: false,
}

export const Booking: React.FC = () => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState<any>(initialErrors);
    const [progress, setProgress] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const {clinics, admin} = useContext(DBContext) || {};

    const clear = () => {
        setTimeout(() => {
            setSuccess(null);
            setErrors({});
        }, 2000)
    }

    const sendEmail = async () => {
        if (progress || !form.name || !form.phone) {
            setErrors({
                name: !form.name,
                phone: !form.phone,
            });
            return;
        }
        setProgress(true);
        try {
            await emailjs.send(
                admin?.booking.serviceID as string,
                admin?.booking.templateID as string,
                form,
                admin?.booking.publicKey as string,
            )
            setProgress(false);
            setSuccess(true);
            setForm(initialState);
            clear();
        } catch {
            setProgress(false);
            setSuccess(false);
            clear();
        }
    };

    const handleChange = ({target: {name, value}}: any) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    return (
        <>
            <SectionLarge background={'#0C3C64'}>
                <Container>
                    <StyledForm as='form' onSubmit={sendEmail}>
                        {progress && <Progress><CircularProgress/></Progress>}
                        <TextField
                            error={errors.name}
                            fullWidth
                            required
                            name="name"
                            label={admin?.contactForm.name}
                            variant='standard'
                            value={form.name}
                            onChange={handleChange}
                        />

                        <InputMask
                            mask="(099)-999 99 99"
                            value={form.phone}
                            disabled={false}
                            onChange={handleChange}
                        >
                            <TextField
                                type="tel"
                                error={errors.phone}
                                value={form.phone}
                                fullWidth
                                required
                                name="phone"
                                label={admin?.contactForm.phone}
                                variant='standard'
                            />
                        </InputMask>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="clinic">{admin?.contactForm.clinic}</InputLabel>
                            <Select
                                fullWidth
                                labelId="clinic"
                                name="clinic"
                                label={admin?.contactForm.clinic}
                                value={form.clinic}
                                onChange={handleChange}
                            >
                                {clinics?.map((c, i) => (
                                    <MenuItem value={c.title} key={i}>{c.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            name="message"
                            label={admin?.contactForm.message}
                            variant='standard'
                            value={form.message}
                            onChange={handleChange}
                            multiline
                            InputProps={{
                                inputComponent: TextareaAutosize,
                            }}
                        />

                        {success !== null && <Message success={success}>
                            {success && <Title>{admin?.contactForm.success}</Title>}
                            {!success && <Title>{admin?.contactForm.failure}</Title>}
                        </Message>}
                    </StyledForm>
                </Container>
            </SectionLarge>

            <Book dark={true} submit={sendEmail}/>
        </>
    );
}
