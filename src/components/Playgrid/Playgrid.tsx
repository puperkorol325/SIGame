import React from "react"
import styles from "./Playgrid.module.css"
import { questionsList } from "../../constants/questionsList"

type PlaygridProps = {
    rows: number;
    columns: number;
}

const Playgrid:React.FC<PlaygridProps> = ({ rows, columns }) => {

    

    return (
        <div className={styles.grid}>
            {questionsList.map((item, rowIndex) => (
                <div key={rowIndex} className={styles.gridRow}>
                    <div key={0} className={[styles.gridCellForTopic].join("")}>
                        <h1 className={styles.topicTitle}>{item.topic}</h1>
                    </div>
                    {Object.keys(item.questions).map((question, colIndex) => (
                        <div key={colIndex} className={styles.gridCell}>
                            <h1 className={styles.questionTitle}>{question}</h1>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export { Playgrid }