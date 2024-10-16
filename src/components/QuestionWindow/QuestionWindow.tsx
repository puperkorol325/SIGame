import React, { useState } from "react";
import styles from "./QuestionWindow.module.css";
import { questionsList } from "../../constants/questionsList";

type QuestionWindowProps = {
    topicKey: number;
    questionKey: number;
}

const QuestionWindow:React.FC<QuestionWindowProps> = ({ topicKey, questionKey }) => {

    const [timeIsStarted, setTimeIsStarted] = useState(false);

    console.log(topicKey,questionKey)

    setTimeout(() => {
        setTimeIsStarted(true);
    },3000)

    return (
        <div className={styles.QuestionWindow}>
            <div className={styles.questionTitle}>
                <h1>{questionsList[topicKey].questions[questionKey].question}</h1>
            </div>
            <div className={styles.timer}>
                {timeIsStarted && (<div className={styles.timerBar}></div>)}
            </div>
        </div>
    )
}

export { QuestionWindow }