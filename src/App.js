import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import questionsByTopic from "./data/questionsByTopic";

function App() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [topic, setTopic] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleFinish = (score, answers) => {
    setScore(score);
    setUserAnswers(answers);
  };

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
        <Quiz topic={topic} onFinish={handleFinish} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <span className="text-2xl mb-4">Quiz Finished!</span>
          <span className="text-xl mb-6">Your score: {score}</span>
          <div className="mb-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Summary:</h3>
            <ul>
              {userAnswers.map((ans, idx) => (
                <li key={idx} className="mb-1">
                  <span className="font-medium">
                    Q{idx + 1}: {questionsByTopic[topic][idx].question}
                  </span>
                  <br />
                  <span>
                    Your answer:{" "}
                    <span
                      className={
                        ans.selected === ans.correct
                          ? "text-green-700"
                          : "text-red-700"
                      }
                    >
                      {questionsByTopic[topic][idx].options[ans.selected] ??
                        "No answer"}
                    </span>
                    {" | "}
                    Correct answer:{" "}
                    <span className="text-green-700">
                      {questionsByTopic[topic][idx].options[ans.correct]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setStarted(false);
              setScore(null);
              setTopic(null);
              setUserAnswers([]);
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
