import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { red } from "@mui/material/colors";
import styles from "./AddNewTeamForm.module.css";
import Button from '@mui/material/Button';

type AddNewTeamFormProps = {
    onAddNewTeam: (teamName:string) => void;
}

const AddNewTeamForm: React.FC<AddNewTeamFormProps> = ({ onAddNewTeam }) => {

    const [value,setValue] = useState("");

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddNewTeam(value);
        setValue("");
    }

    return (
        <form className={styles.AddNewTeamForm} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Создайте команду</h2>
            <TextField id="filled-basic" label="Filled" variant="filled" className={styles.TeamNameField} value={value} onChange={(e) => setValue(e.target.value)}/>
            <Button variant="contained" className={styles.AddButton} type="submit">Добавить команду</Button>
        </form>
    );
};

export { AddNewTeamForm };