import React, { useEffect, useState } from "react";
import { team } from "../../types/team";
import styles from "./TeamsBar.module.css";
import { Button } from "@mui/material";

type TeamsBarProps = {
  teams: team[];
  gameStatus: string;
  onStopGame: (teamKey: string) => void;
};

const TeamsBar: React.FC<TeamsBarProps> = ({
  teams,
  gameStatus,
  onStopGame,
}) => {
  const [answerIsAllowed, setAnswerIsAllowed] = useState(false);

  useEffect(() => {
    setAnswerIsAllowed(false);

    const initialTimer = setTimeout(() => {
      setAnswerIsAllowed(true);
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <div className={styles.teamsBar}>
      {teams.map((item, index) => (
        <div key={index} className={styles.teamItem}>
          <div className={styles.teamInfo}>
            <h2 className={styles.teamName}>{item.name}</h2>
            <h3 className={styles.teamScore}>{item.score}</h3>
          </div>
          <div className={styles.buttonContainer}>
            {(gameStatus == "question" || gameStatus == "paused") && (
              <button
                className={styles.answerBtn}
                onClick={() => (answerIsAllowed ? onStopGame(item.key) : null)}
              >
                Ответ
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { TeamsBar };
