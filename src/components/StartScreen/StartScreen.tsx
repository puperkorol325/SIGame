import React, { useEffect, useState } from "react";
import { AddNewTeamForm } from "../AddNewTeamForm/AddNewTeamForm";
import styles from "./StartScreen.module.css"
import { team } from "../../types/team";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';

type StartScreenProps = {
    onAddNewTeam: (teamName:string) => void;
    teams: team[];
}

const StartScreen:React.FC<StartScreenProps> = ({ onAddNewTeam, teams }) => {

    const [addedTeams, setAddedTeams] = useState(teams);

    useEffect(() => {
        setAddedTeams(teams);
    }, [teams]);

    return (
        <div className={styles.startScreen}>
            <div className={styles.startGame}>
                <h1 className={styles.title}>Добро пожаловать в Свою Игру!</h1>
                <div className={styles.rulesBlock}>
                    <h2 className={styles.rulesTitle}>Правила:</h2>
                    <ul className={styles.rulesList}>
                        <li>В игре участвуют от 3 до 5 команд или одиночных игроков</li>
                        <li>Путем жеребьевки избирается команда, играющая первой</li>
                        <li>Первая команда выбирает вопрос из таблицы, сообщая ведущему тему вопроса и количество баллов, за которые он разыгрывается</li>
                        <li>Ведущий раскрывает вопрос игрокам</li>
                        <li>Вопрос звучит в течение 10 секунд</li>
                        <li>Любая команда (или одиночный игрок) может ответить на вопрос, подняв руку (тот, кто сделает это первым, ответит на вопрос), пока команда отвечает, игра приостанавливается, у команды есть 10 секунд на ответ</li>
                        <li>Если команда (или одиночный игрок) не отвечает или дает неправильный ответ, они теряют то количество очков, за которое разыгрывается вопрос, и любая другая команда может ответить на этот вопрос</li>
                        <li>Если команда (или одиночный игрок) дает правильный ответ, они набирают то количество очков, на которое рассчитан игровой вопрос, и выбирают следующий вопрос</li>
                        <li>Если никто не отвечает на вопрос правильно, никто не теряет и не набирает очки, и команда, которая последней ответила на вопрос, выбирает еще раз</li>
                        <li>Побеждает команда, набравшая наибольшее количество очков</li>
                    </ul>
                </div>
                <AddNewTeamForm onAddNewTeam={onAddNewTeam}/>
            </div>
            <div className={styles.teamsBlock}>
                <h2 className={styles.teamsTitle}>Команды</h2>
                <List className={styles.teamList}>
                    {addedTeams.map((item) => (
                        <div className={styles.teamItem} key={item.key}>
                            <ListItemText primary={item.name}></ListItemText>
                        </div>
                    ))}
                </List>
                <Button variant="contained" className={styles.startGameButton}><p className={styles.startGameButtonText}>Начать игру!</p></Button>
            </div>
        </div>
    );
}

export { StartScreen };