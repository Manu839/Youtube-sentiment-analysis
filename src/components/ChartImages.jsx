import React from 'react';

const ChartImages = ({ bar, pie }) => (
  <section className="bg-white rounded-xl shadow p-6 border border-green-200">
    <h2 className="text-green-700 text-xl font-bold mb-4">Charts</h2>

    <div className="flex flex-col sm:flex-row gap-8 justify-center">
      {bar && (
        <figure className="flex-1">
          <img src={bar} alt="Bar Chart" className="rounded-lg" />
          <figcaption className="text-center mt-2 text-sm text-gray-500">
            Bar Chart
          </figcaption>
        </figure>
      )}

      {pie && (
        <figure className="flex-1">
          <img src={pie} alt="Pie Chart" className="rounded-lg" />
          <figcaption className="text-center mt-2 text-sm text-gray-500">
            Pie Chart
          </figcaption>
        </figure>
      )}
    </div>
  </section>
);

export default ChartImages;
