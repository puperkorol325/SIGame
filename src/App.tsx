import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddNewTeamForm } from './components/AddNewTeamForm';
import { teamsList } from './constants/teamsList';

function App() {

  const [teams, setTeams] = useState(teamsList);

  const AddNewTeam = (teamName:string) => {

    setTeams((prevState) => [...prevState, {name:teamName, score:0}]);

  }

  console.log(teams);

  return (
    <AddNewTeamForm onAddNewTeam={AddNewTeam}/>
  );
}

export default App;
