import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddNewTeamForm } from './components/AddNewTeamForm/AddNewTeamForm';
import { teamsList } from './constants/teamsList';
import { StartScreen } from './components/StartScreen/StartScreen';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [teams, setTeams] = useState(teamsList);

  const AddNewTeam = (teamName:string) => {

    if (teams.length < 5){
      setTeams((prevState) => [...prevState, {key: uuidv4(), name:teamName, score:0}]);
    }else {
      alert("Не может быть более пяти команд!")
    }

  }

  return (
    <StartScreen onAddNewTeam={AddNewTeam} teams={teams}/>
  );
}

export default App;
