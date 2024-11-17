import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AddNewTeamForm } from "./components/AddNewTeamForm/AddNewTeamForm";
import { teamsList } from "./constants/teamsList";
import { StartScreen } from "./components/StartScreen/StartScreen";
import { v4 as uuidv4 } from "uuid";
import { start } from "repl";
import { Playgrid } from "./components/Playgrid/Playgrid";
import { TeamsBar } from "./components/TeamsBar/TeamsBar";
import { questionsList } from "./constants/questionsList";
import { QuestionWindow } from "./components/QuestionWindow/QuestionWindow";
import { question } from "./types/question";
import { PauseWindow } from "./components/PauseWindow/PauseWindow";
import { RightAnswerWindow } from "./components/RightAnswerWindow/RightAnswerWindow";
import { FinalWindow } from "./components/FinalWindow/FinalWindow";

function App() {
  const [teams, setTeams] = useState(teamsList);
  const [questions, setQuestions] = useState(questionsList);
  const [gameStatus, setGameStatus] = useState("start");
  const [pickedQuestion, setPickedQuestion] = useState({
    topicKey: -1,
    key: -1,
  });
  const [answeringTeam, setAnsweringTeam] = useState("");

  const AddNewTeam = (teamName: string) => {
    if (teams.length < 5) {
      setTeams((prevState) => [
        ...prevState,
        { key: uuidv4(), name: teamName, score: 0 },
      ]);
    } else {
      alert("Не может быть более пяти команд!");
    }
  };

  const handleStartGame = () => {
    if (teams.length >= 3 && teams.length <= 5) {
      setGameStatus("on");
    } else {
      alert("Неверное число команд! Команд должно быть от 3 до 5!");
    }
  };

  const handlePick = async (topicKey: number, key: number) => {
    await setPickedQuestion({ topicKey, key });
    setGameStatus("question");
  };

  const handleContinueGame = (
    topicKey: number,
    questionKey: number,
    teamKey?: string,
  ) => {
    setGameStatus("on");
    setAnsweringTeam("");
    if (teamKey) {
      setTeams((prevState) => [
        ...prevState.map((item) =>
          item.key != teamKey
            ? item
            : {
                key: item.key,
                name: item.name,
                score:
                  item.score + questions[topicKey].questions[questionKey].cost,
              },
        ),
      ]);
    }
    setQuestions((prevState) => [
      ...prevState.slice(0, topicKey),
      {
        topic: prevState[topicKey].topic,
        questions: prevState[topicKey].questions.map(
          (item, index): question =>
            index != questionKey ? item : { cost: 0, question: "", answer: "" },
        ),
      },
      ...prevState.slice(topicKey + 1),
    ]);
    setPickedQuestion({ topicKey: -1, key: -1 });
  };

  const handleWrongAnswer = (
    topicKey: number,
    questionKey: number,
    teamKey: string,
  ) => {
    setTeams((prevState) => [
      ...prevState.map((item) =>
        item.key != teamKey
          ? item
          : {
              key: item.key,
              name: item.name,
              score:
                item.score - questions[topicKey].questions[questionKey].cost,
            },
      ),
    ]);
    setGameStatus("question");
  };

  const handleStopGame = (teamKey: string) => {
    setAnsweringTeam(teamKey);
    setGameStatus("paused");
  };

  const handleTimeIsOver = (topicKey: number, questionKey: number) => {
    setGameStatus("revealingAnswer");
    setTimeout(() => handleContinueGame(topicKey, questionKey), 3000);
  };

  const handleContinueQuestion = () => {
    setGameStatus("question");
  };

  useEffect(() => {
    let gameOver = true;
    const updatedQuestions = questions.map((item) => {
      let topicIsCompleted = true;
      for (let i of item.questions) {
        if (i.cost !== 0) {
          topicIsCompleted = false;
          break;
        }
      }
      if (item.topic != "") {
        gameOver = false;
      }
      return topicIsCompleted ? { topic: "", questions: item.questions } : item;
    });
    if (gameOver) {
      setGameStatus("end");
    }
    setQuestions(updatedQuestions);
  }, [handleContinueGame]);

  return (
    <>
      {gameStatus == "start" && (
        <div className="startContainer">
          <StartScreen
            onAddNewTeam={AddNewTeam}
            onStartGame={handleStartGame}
            teams={teams}
          />
        </div>
      )}
      {gameStatus != "start" && (
        <>
          {gameStatus == "paused" && (
            <PauseWindow
              topicKey={pickedQuestion.topicKey}
              questionKey={pickedQuestion.key}
              onContinueGame={handleContinueGame}
              teamKey={answeringTeam}
              onWrongAnswer={handleWrongAnswer}
              onContinueQuestion={handleContinueQuestion}
            />
          )}
          <div
            className={[
              "gameContainer",
              gameStatus == "paused" ? "gamePaused" : "",
            ].join(" ")}
          >
            {gameStatus == "on" && (
              <Playgrid questions={questions} onPickQuestion={handlePick} />
            )}
            {(gameStatus == "question" || gameStatus == "paused") && (
              <QuestionWindow
                topicKey={pickedQuestion.topicKey}
                questionKey={pickedQuestion.key}
                onContinueGame={handleContinueGame}
                gameStatus={gameStatus}
                onTimeIsOver={handleTimeIsOver}
              />
            )}
            {gameStatus == "revealingAnswer" && (
              <RightAnswerWindow
                topicKey={pickedQuestion.topicKey}
                questionKey={pickedQuestion.key}
                questions={questions}
              />
            )}
            {(gameStatus == "question" ||
              gameStatus == "paused" ||
              gameStatus == "on" ||
              gameStatus == "revealingAnswer") && (
              <TeamsBar
                teams={teams}
                gameStatus={gameStatus}
                onStopGame={handleStopGame}
              />
            )}
            {gameStatus == "end" && <FinalWindow teams={teams} />}
          </div>
        </>
      )}
    </>
  );
}

export default App;
