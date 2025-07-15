import React from 'react';

const SentimentResults = ({ results }) => (
  <section className="bg-white rounded-xl shadow p-6 border border-green-200">
    <h2 className="text-green-700 text-xl font-bold mb-4">Comment Sentiments</h2>

    <div className="grid sm:grid-cols-3 gap-4 text-center">
      <Sentiment label="Positive" value={results.num_positive} color="green" />
      <Sentiment label="Neutral" value={results.num_neutral} color="yellow" />
      <Sentiment label="Negative" value={results.num_negative} color="red" />
    </div>
  </section>
);

const Sentiment = ({ label, value, color }) => (
  <div
    className={`rounded-lg p-4 border bg-${color}-50 border-${color}-200`}
  >
    <p className={`text-lg font-semibold text-${color}-700`}>{value}</p>
    <p className="text-xs uppercase tracking-wide text-gray-600">{label}</p>
  </div>
);

export default SentimentResults;
