import React, { useState } from "react"
import styles from "./Playgrid.module.css"
import { questionsList } from "../../constants/questionsList"

type PlaygridProps = {
    onPickQuestion: (topicKey:number, key:number) => void;
}

const Playgrid:React.FC<PlaygridProps> = ({ onPickQuestion }) => {

    const [pickedQuestion, setPickedQuestion] = useState({topicKey: -1, key: -1});
    const [questions, setQuestions] = useState(questionsList);
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
                            styles.gridCell,
                            pickedQuestion.topicKey === rowIndex && pickedQuestion.key === colIndex && isBlinking
                                ? styles.blink
                                : ''
                        ].join(" ")}
                        onClick={() => handlePick(rowIndex, colIndex)}
                        >
                        <h1 className={styles.questionTitle}>{question.cost}</h1>
                    </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export { Playgrid }