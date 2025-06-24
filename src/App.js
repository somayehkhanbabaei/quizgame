import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [topic, setTopic] = useState(null);

  return (
    <div className="App">
      {!started ? (
        <Home
          onStart={(selectedTopic) => {
            setTopic(selectedTopic);
            setStarted(true);
          }}
        />
      ) : score === null ? (
        <Quiz topic={topic} onFinish={(score) => setScore(score)} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span className="text-2xl mb-4">Quiz Finished!</span>
          <span className="text-xl mb-6">Your score: {score}</span>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setStarted(false);
              setScore(null);
              setTopic(null);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
