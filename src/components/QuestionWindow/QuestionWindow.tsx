import React, { useRef, useState, useEffect } from "react";
import styles from "./QuestionWindow.module.css";
import { questionsList } from "../../constants/questionsList";
import { start } from "repl";
import { useTimer } from "react-timer-hook";
import { css } from "@emotion/react";

type QuestionWindowProps = {
  topicKey: number;
  questionKey: number;
  onContinueGame: (
    topicKey: number,
    questionKey: number,
    teamKey?: string,
  ) => void;
  onTimeIsOver: (topicKey: number, questionKey: number) => void;
  gameStatus: string;
};

const QuestionWindow: React.FC<QuestionWindowProps> = ({
  topicKey,
  questionKey,
  onContinueGame,
  onTimeIsOver,
  gameStatus,
}) => {
  const { seconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(new Date().getTime() + 10000),
    onExpire: () => onTimeIsOver(topicKey, questionKey),
  });

  useEffect(() => {
    if (gameStatus === "paused" && isRunning) {
      pause();
    } else if (gameStatus === "question" && !isRunning) {
      resume();
    }
  }, [gameStatus]);

  useEffect(() => {
    pause();

    const initialTimer = setTimeout(() => {
      restart(new Date(new Date().getTime() + 10000));
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
      pause();
    };
  }, []);

  if (document.getElementById("timerBar")?.getBoundingClientRect().width == 0) {
    onTimeIsOver(topicKey, questionKey);
  }

  return (
    <div className={styles.QuestionWindow}>
      <div className={styles.questionTitle}>
        <h1>{questionsList[topicKey].questions[questionKey].question}</h1>
      </div>
      <div className={styles.timer}>
        <div
          className={[styles.timerBar, !isRunning ? styles.paused : ""].join(
            " ",
          )}
          id="timerBar"
        ></div>
      </div>
    </div>
  );
};

export { QuestionWindow };
