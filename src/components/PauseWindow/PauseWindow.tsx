import React from "react";
import styles from "./PauseWindow.module.css";

type PauseWindowProps = {
  topicKey: number;
  questionKey: number;
  teamKey: string;
  onContinueGame: (
    topicKey: number,
    questionKey: number,
    teamKey?: string,
  ) => void;
  onWrongAnswer: (
    topicKey: number,
    questionKey: number,
    teamKey: string,
  ) => void;
  onContinueQuestion: () => void;
};

export const PauseWindow: React.FC<PauseWindowProps> = ({
  topicKey,
  questionKey,
  onContinueGame,
  teamKey,
  onWrongAnswer,
  onContinueQuestion,
}) => {
  return (
    <div className={styles.PauseWindow}>
      <h1 className={styles.gamePausedH1} onClick={onContinueQuestion}>
        Игра приостановлена!
      </h1>
      <div className={styles.buttons}>
        <button
          className={styles.rightAnswer}
          onClick={() => onContinueGame(topicKey, questionKey, teamKey)}
        >
          Верно
        </button>
        <button
          className={styles.incorrectAnswer}
          onClick={() => onWrongAnswer(topicKey, questionKey, teamKey)}
        >
          Неверно
        </button>
      </div>
    </div>
  );
};
