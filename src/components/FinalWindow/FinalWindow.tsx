import React, { useEffect, useState } from "react";
import { team } from "../../types/team";
import styles from "./FinalWindow.module.css";
import { List, ListItemText } from "@mui/material";

type FinalWindowProps = {
  teams: team[];
};

export const FinalWindow: React.FC<FinalWindowProps> = ({ teams }) => {
  const [sortedTeams, setSortedTeams] = useState<team[]>(teams);

  useEffect(() => {
    const sorted = [...teams].sort((a, b) => b.score - a.score);
    setSortedTeams(sorted);
    console.log(teams);
  }, [teams]);

  const winner = sortedTeams[0];
  const others = sortedTeams.slice(1);

  return (
    <div className={styles.finalScreen}>
      <div className={styles.confetti}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.window}>
        <div className={styles.winner}>
          <h1 className={styles.title}>Победитель:</h1>
          <div className={styles.teamItem} key={winner.key}>
            <h2 className={styles.name}>{winner.name}</h2>
            <h2 className={styles.score}>{winner.score}</h2>
          </div>
        </div>
        <div className={styles.others}>
          <h1 className={styles.title}>Остальные участники:</h1>
          <List className={styles.teamList}>
            {others.map((item) => (
              <div className={styles.teamItem} key={item.key}>
                <h2 className={styles.name}>{item.name}</h2>
                <h2 className={styles.score}>{item.score}</h2>
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};
