import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lightColor, setLightColor] = useState("red");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isRunning, setIsRunning] = useState(false); 
  const [message, setMessage] = useState("");
  const [intervalId, setIntervalId] = useState(null); 


  const changeLight = () => {
    const colors = ["red", "yellow", "green"];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setLightColor(newColor);
  };


  useEffect(() => {
    if (!isRunning) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      changeLight();
    }, Math.random() * 2000 + 1000); 
    setIntervalId(id);

    return () => {
      if (id) {
        clearInterval(id);
      }
      setIntervalId(null);
    };
  }, [isRunning]);


  const handlePlayerAction = () => {
    if (!isRunning) return;

    if (lightColor === "green") {
      setScore((prevScore) => prevScore + 1);
      setMessage("Right!");
    } else {
      setMistakes((prevMistakes) => prevMistakes + 1);
      setMessage("Wrong game!"); 
    }
    setTimeout(() => setMessage(""), 1000);
  };


  const stopGame = () => {
    setIsRunning(false);
  };

 
  const startGame = () => {
    setScore(0);
    setMistakes(0);
    setMessage("");
    setLightColor("red"); 
    setIsRunning(true);
  };

  return (
    <div className="App">
   
      <div className="score-display">
        <p>Score: {score}</p>
        <p>Mistakes: {mistakes}</p>
      </div>

      <div className="traffic-light">
        <div
          className={`light red ${lightColor === "red" ? "active" : ""}`}
        ></div>
        <div
          className={`light yellow ${lightColor === "yellow" ? "active" : ""}`}
        ></div>
        <div
          className={`light green ${lightColor === "green" ? "active" : ""}`}
        ></div>
      </div>

   
      <div className="button-container">
        {isRunning ? (
          <button onClick={handlePlayerAction} disabled={!isRunning}>
            Click!
          </button>
        ) : (
          <button onClick={startGame}>START</button>
        )}

        {isRunning && ( 
          <button onClick={stopGame}>STOP</button>
        )}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
