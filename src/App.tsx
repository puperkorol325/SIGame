import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddNewTeamForm } from './components/AddNewTeamForm/AddNewTeamForm';
import { teamsList } from './constants/teamsList';
import { StartScreen } from './components/StartScreen/StartScreen';

function App() {

  const [teams, setTeams] = useState(teamsList);

  const AddNewTeam = (teamName:string) => {

    if (teams.length < 5){
      setTeams((prevState) => [...prevState, {name:teamName, score:0}]);
    }else {
      alert("Не может быть более пяти команд!")
    }

  }

  return (
    <StartScreen onAddNewTeam={AddNewTeam} teams={teams}/>
  );
}

export default App;
