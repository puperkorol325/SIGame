import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";
import styles from "./AddNewTeamForm.module.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

type AddNewTeamFormProps = {
  onAddNewTeam: (teamName: string) => void;
};

const AddNewTeamForm: React.FC<AddNewTeamFormProps> = ({ onAddNewTeam }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (value == "") {
      alert("Вы не ввели название команды!");
    } else {
      event.preventDefault();
      onAddNewTeam(value);
      setValue("");
    }
  };

  return (
    <form className={styles.AddNewTeamForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Создайте команду</h2>
      <TextField
        id="filled-basic"
        label="Название команды"
        variant="filled"
        className={styles.TeamNameField}
        value={value}
        onChange={(e) =>
          e.target.value.length <= 16
            ? setValue(e.target.value)
            : setValue(value)
        }
        sx={{
          "& label": {
            fontFamily: "Roboto Condensed, sans-serif",
          },

          "& .MuiInputBase-input": {
            fontFamily: "Roboto Condensed, sans-serif",
          },
        }}
      />
      <Button
        variant="contained"
        className={styles.AddButton}
        type="submit"
        sx={{
          fontFamily: "Roboto Condensed, sans-serif",
        }}
      >
        Добавить команду
      </Button>
    </form>
  );
};

export { AddNewTeamForm };
