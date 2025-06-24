import React, { useState } from "react";
import questionsByTopic from "../data/questionsByTopic";

export default function Quiz({ topic, onFinish, onBack }) {
  const questions = questionsByTopic[topic] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (idx) => {
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [
      ...prev,
      { selected: idx, correct: questions[current].answer },
    ]);
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      if (current + 1 < questions.length) {
        setLoading(true);
        setTimeout(() => {
          setCurrent((prev) => prev + 1);
          setLoading(false);
        }, 300); // short loading effect
      } else {
        onFinish(
          idx === questions[current].answer ? score + 1 : score,
          userAnswers.concat([{ selected: idx, correct: questions[current].answer }])
        );
      }
    }, 1000);
  };

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-600">No questions for this topic.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-blue-600 animate-pulse">Loading next question...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back button only on the first question */}
        {current === 0 && (
          <button
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            onClick={onBack}
          >
            &larr; Back
          </button>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">
          {questions[current].question}
        </h2>
        <div className="flex flex-col gap-4">
          {questions[current].options.map((option, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded border text-left transition ${
                selected === idx
                  ? idx === questions[current].answer
                    ? "bg-green-400 text-white"
                    : "bg-red-400 text-white"
                  : "bg-white hover:bg-blue-200"
              }`}
              onClick={() => handleOptionClick(idx)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mt-6 text-lg">
            {selected === questions[current].answer ? (
              <span className="text-green-700 font-bold">Correct!</span>
            ) : (
              <span className="text-red-700 font-bold">Incorrect!</span>
            )}
          </div>
        )}
        <div className="mt-4 text-right text-sm text-gray-500">
          Question {current + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
