import React from 'react';

const SentimentResults = ({ results }) => (
  <section className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-xl p-8 border border-purple-200/50 mt-10 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
    <div className="relative">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
          </svg>
        </div>
        <h2 className="text-gray-800 text-3xl font-bold">Comment Sentiments</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 text-center">
        <Sentiment label="Positive" value={results.num_positive} color="green" />
        <Sentiment label="Neutral" value={results.num_neutral} color="yellow" />
        <Sentiment label="Negative" value={results.num_negative} color="red" />
      </div>
    </div>
  </section>
);

const Sentiment = ({ label, value, color }) => (
  <div className={`bg-gradient-to-br from-white to-${color}-50 rounded-xl p-6 border border-${color}-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
    <div className="flex items-center justify-center mb-3">
      <div className={`w-10 h-10 bg-gradient-to-br ${
        color === 'green' ? 'from-green-500 to-emerald-600' :
        color === 'yellow' ? 'from-yellow-500 to-orange-600' :
        'from-red-500 to-pink-600'
      } rounded-lg flex items-center justify-center text-white shadow-md`}>
        {color === 'green' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )}
        {color === 'yellow' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
        )}
        {color === 'red' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )}
      </div>
    </div>
    <p className={`text-2xl font-bold mb-1 ${
      color === 'green' ? 'text-green-700' :
      color === 'yellow' ? 'text-yellow-700' :
      'text-red-700'
    }`}>{value}</p>
    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
  </div>
);

export default SentimentResults;
