import React, { useState } from "react";

const topics = [
  { key: "sport", label: "Sport" },
  { key: "science", label: "Science" },
  { key: "history", label: "History" },
  { key: "geography", label: "Geography" },
  { key: "music", label: "Music" },
];

export default function Home({ onStart }) {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].key);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Quiz App</h1>
      <div className="mb-6 w-full max-w-xs">
        <label className="block mb-2 text-lg text-blue-800 font-semibold">
          Choose a topic:
        </label>
        <select
          className="w-full p-2 rounded border"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          {topics.map((topic) => (
            <option key={topic.key} value={topic.key}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => onStart(selectedTopic)}
      >
        Start Quiz
      </button>
    </div>
  );
}
