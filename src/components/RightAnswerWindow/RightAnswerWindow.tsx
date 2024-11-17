import React, { useRef, useState, useEffect } from "react";
import styles from "./RightAnswerWindow.module.css";
import { question, questionList } from "../../types/question";

type RightAnswerWindowProps = {
  topicKey: number;
  questionKey: number;
  questions: questionList;
};

export const RightAnswerWindow: React.FC<RightAnswerWindowProps> = ({
  topicKey,
  questionKey,
  questions,
}) => {
  return (
    <div className={styles.RightAnswerWindow}>
      <h1 className={styles.answer}>
        {questions[topicKey].questions[questionKey].answer}
      </h1>
    </div>
  );
};
