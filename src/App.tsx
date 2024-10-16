import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddNewTeamForm } from './components/AddNewTeamForm/AddNewTeamForm';
import { teamsList } from './constants/teamsList';
import { StartScreen } from './components/StartScreen/StartScreen';
import { v4 as uuidv4 } from 'uuid';
import { start } from 'repl';
import { Playgrid } from './components/Playgrid/Playgrid';
import { TeamsBar } from './components/TeamsBar/TeamsBar';
import { questionsList } from './constants/questionsList';
import { QuestionWindow } from './components/QuestionWindow/QuestionWindow';

function App() {

  const [teams, setTeams] = useState(teamsList);
  const [questions, setQuestions] = useState(questionsList);
  const [gameStatus, setGameStatus] = useState("start");
  const [pickedQuestion, setPickedQuestion] = useState({topicKey: -1, key: -1});

  const AddNewTeam = (teamName:string) => {

    if (teams.length < 5){
      setTeams((prevState) => [...prevState, {key: uuidv4(), name:teamName, score:0}]);
    }else {
      alert("Не может быть более пяти команд!")
    }

  }

  const handleStartGame = () => {

    if (teams.length >= 3 && teams.length <= 5){
      setGameStatus("on");
    }else{
      alert("Неверное число команд! Команд должно быть от 3 до 5!")
    }

  }

  const handlePick = async (topicKey:number, key:number) => {
    await setPickedQuestion({topicKey, key});
    setGameStatus('question');
  }

  return (
    <>
      {gameStatus == "start" && (
        <StartScreen onAddNewTeam={AddNewTeam} onStartGame={handleStartGame} teams={teams}/>
      )}
      {gameStatus == "on" && (
        <Playgrid onPickQuestion={handlePick}/>
      )}
      {gameStatus == "on" && (
        <TeamsBar teams={teams}/>
      )}
      {gameStatus == "question" && (
        <QuestionWindow topicKey={pickedQuestion.topicKey} questionKey={pickedQuestion.key}/>
      )}
      {gameStatus == "question" && (
        <TeamsBar teams={teams}/>
      )}
    </>
  );
}

export default App;
