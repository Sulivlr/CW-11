import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";

interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    name: string;
    label: string;
}

const FileInput: React.FC<Props> = ({onChange, label, name}) => {
    const [fileName, setFileName] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName('');
        }
        onChange(event);
    };

    return (
        <>
            <input
                type="file"
                name={name}
                style={{display: 'none'}}
                ref={inputRef}
                onChange={onFileChange}
            />
            <Grid container spacing={2} alignItems="center">
                <Grid item xs >
                    <TextField
                        label={label}
                        inputProps={{readOnly: true}}
                        value={fileName}
                        onClick={activateInput}
                    />
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={activateInput}>Browse</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;