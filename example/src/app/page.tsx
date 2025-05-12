"use client";

import useAi from "reactjs-useai-test1";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>(""); // state to hold the input
  const { call, data, loading, error } = useAi<
    { prompt: string },
    { response: string }
  >("/api/test", {
    headers: {
      Authorization: "Bearer user token",
    },
  });

  const handleButtonClick = () => {
    if (input.trim()) {
      call({ prompt: input });
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">useAi Test in Next.js</h1>

      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a prompt"
      />

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Call useAi
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {data && (
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
