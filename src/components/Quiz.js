import React, { useState } from "react";
import questionsByTopic from "../data/questionsByTopic";

export default function Quiz({ topic, onFinish, onBack }) {
  // Get questions for the selected topic
  const questions = questionsByTopic[topic] || [];
  // Track which question is currently shown
  const [current, setCurrent] = useState(0);
  // Track which option the user selected for the current question
  const [selected, setSelected] = useState(null);
  // Track the user's score
  const [score, setScore] = useState(0);
  // Show feedback (correct/incorrect) after answering
  const [showResult, setShowResult] = useState(false);
  // Store all user answers for summary
  const [userAnswers, setUserAnswers] = useState([]);
  // Show loading animation between questions
  const [loading, setLoading] = useState(false);

  // Called when user clicks an answer option
  const handleOptionClick = (idx) => {
    setSelected(idx); // Remember which option was picked
    setShowResult(true); // Show feedback (correct/incorrect)
    if (idx === questions[current].answer) {
      setScore((prev) => prev + 1); // Add to score if correct
    }
    setUserAnswers((prev) => [
      ...prev,
      { selected: idx, correct: questions[current].answer },
    ]);
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      if (current + 1 < questions.length) {
        // If there are more questions, go to next after short loading
        setLoading(true);
        setTimeout(() => {
          setCurrent((prev) => prev + 1);
          setLoading(false);
        }, 300);
      } else {
        // If last question, finish quiz and send score/answers to parent
        onFinish(
          idx === questions[current].answer ? score + 1 : score,
          userAnswers.concat([{ selected: idx, correct: questions[current].answer }])
        );
      }
    }, 1000); // Wait 1 second to show feedback
  };

  // If no questions for topic, show message
  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-600">No questions for this topic.</span>
      </div>
    );
  }

  // Show loading animation between questions
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
        {/* Show the current question */}
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">
          {questions[current].question}
        </h2>
        {/* Show answer options for current question */}
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
        {/* Show feedback after answering */}
        {showResult && (
          <div className="mt-6 text-lg">
            {selected === questions[current].answer ? (
              <span className="text-green-700 font-bold">Correct!</span>
            ) : (
              <span className="text-red-700 font-bold">Incorrect!</span>
            )}
          </div>
        )}
        {/* Show question number */}
        <div className="mt-4 text-right text-sm text-gray-500">
          Question {current + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
