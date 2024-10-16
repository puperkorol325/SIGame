import React, { useEffect, useState } from "react";
import { team } from "../../types/team";
import styles from "./TeamsBar.module.css"

type TeamsBarProps = {
    teams: team[];
}

const TeamsBar:React.FC<TeamsBarProps> = ({ teams }) => {

    const [teamsList, setTeamsList] = useState(teams);

    useEffect(() => {
        setTeamsList(teams);
    }, [])

    return(
        <div className={styles.teamsBar}>
            {teamsList.map((item,index) => ( 
                <div key={index} className={styles.teamItem}>
                    <h2 className={styles.teamName}>{item.name}</h2>
                    <h3 className={styles.teamScore}>{item.score}</h3>
                </div>
            ))}
        </div>
    )
}

export { TeamsBar }