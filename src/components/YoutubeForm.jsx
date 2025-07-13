import React, { useState } from "react";

export default function YouTubeForm({ onSubmit }) {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return;
    onSubmit(link.trim());   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-green-200 rounded-xl shadow p-6 max-w-xl mx-auto"
    >
      <label className="block text-green-800 font-semibold mb-2">
        YouTube Link
      </label>

      <input
        type="url"
        placeholder="Paste YouTube video URL..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-green-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button
        type="submit"
        className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
      >
        Analyze Video
      </button>
    </form>
  );
}import React, { useState } from "react";

export default function YouTubeForm({ onSubmit }) {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return;
    onSubmit(link.trim());   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-green-200 rounded-xl shadow p-6 max-w-xl mx-auto"
    >
      <label className="block text-green-800 font-semibold mb-2">
        YouTube Link
      </label>

      <input
        type="url"
        placeholder="Paste YouTube video URL..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        className="w-full p-3 rounded-lg bg-green-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button
        type="submit"
        className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
      >
        Analyze Video
      </button>
    </form>
  );
}