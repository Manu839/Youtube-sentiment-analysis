import React, { useState } from "react";

export default function YouTubeForm({ onSubmit }) {
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return;
    onSubmit(link.trim());
  };

  return (
    <div className="mt-16 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-white to-green-50/100 backdrop-blur-sm border border-green-200/50 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/500 to-emerald-700/500"></div>
        <div className="relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Analyze YouTube Video</h3>
            <p className="text-gray-600">Paste your YouTube video link to get instant sentiment analysis</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
        YouTube Link
      </label>

              <div className="relative">
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                  className="w-full p-4 pl-12 rounded-xl bg-white border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>Analyze Video</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
