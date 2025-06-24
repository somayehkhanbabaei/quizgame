import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import questionsByTopic from "./data/questionsByTopic";

function App() {
  // State to track if quiz has started
  const [started, setStarted] = useState(false);
  // State to store user's score after quiz ends
  const [score, setScore] = useState(null);
  // State to store the selected topic
  const [topic, setTopic] = useState(null);
  // State to store user's answers for summary
  const [userAnswers, setUserAnswers] = useState([]);

  // Called when quiz finishes, receives score and answers
  const handleFinish = (score, answers) => {
    setScore(score);
    setUserAnswers(answers);
  };

  // Called when user clicks "Back" or "Try Again"
  const handleBack = () => {
    setStarted(false);
    setScore(null);
    setTopic(null);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      {/* Show Home if quiz not started */}
      {!started ? (
        <Home
          onStart={(selectedTopic) => {
            setTopic(selectedTopic); // Save selected topic
            setStarted(true); // Start quiz
          }}
        />
      ) : score === null ? (
        // Show Quiz if started and not finished
        <Quiz topic={topic} onFinish={handleFinish} onBack={handleBack} />
      ) : (
        // Show summary after quiz is finished
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
            onClick={handleBack}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
