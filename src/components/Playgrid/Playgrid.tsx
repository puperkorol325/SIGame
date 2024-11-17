import React, { useEffect, useState } from "react";
import styles from "./Playgrid.module.css";
import { question, questionList } from "../../types/question";

type PlaygridProps = {
  questions: questionList;
  onPickQuestion: (topicKey: number, key: number) => void;
};

const Playgrid: React.FC<PlaygridProps> = ({ questions, onPickQuestion }) => {
  const [pickedQuestion, setPickedQuestion] = useState({
    topicKey: -1,
    key: -1,
  });
  const [isBlinking, setIsBlinking] = useState(false);

  const handlePick = (topicKey: number, key: number) => {
    setPickedQuestion({ topicKey, key });
    setIsBlinking(true);

    const timer = setTimeout(() => {
      setIsBlinking(false);
      onPickQuestion(topicKey, key);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className={styles.grid}>
      {questions.map((item, rowIndex) => (
        <div key={rowIndex} className={styles.gridRow}>
          <div key={0} className={[styles.gridCellForTopic].join("")}>
            <h1 className={styles.topicTitle}>{item.topic}</h1>
          </div>
          {item.questions.map((question, colIndex) => (
            <div
              key={colIndex}
              className={[
                question.question != "" ? styles.gridCell : styles.inactiveCell,
                pickedQuestion.topicKey === rowIndex &&
                pickedQuestion.key === colIndex &&
                isBlinking
                  ? styles.blink
                  : "",
              ].join(" ")}
              onClick={() =>
                question.question != "" ? handlePick(rowIndex, colIndex) : null
              }
            >
              <h1 className={styles.questionTitle}>
                {question.question != "" ? question.cost : null}
              </h1>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export { Playgrid };
