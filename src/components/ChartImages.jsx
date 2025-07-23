import React from 'react';

const ChartImages = ({ bar, pie }) => (
  <section className="bg-gradient-to-br mt-10 from-white to-indigo-50/30 rounded-2xl shadow-xl p-8 border border-indigo-200/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5"></div>
    <div className="relative">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h2 className="text-gray-800 text-3xl font-bold">Visual Analytics</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {bar && (
          <figure className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4">
              <img src={bar} alt="Bar Chart" className="w-full rounded-lg shadow-md" />
            </div>
            <figcaption className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-700">Bar Chart</span>
              </div>
              <p className="text-sm text-gray-500">Sentiment distribution overview</p>
            </figcaption>
          </figure>
        )}

        {pie && (
          <figure className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4">
              <img src={pie} alt="Pie Chart" className="w-full rounded-lg shadow-md" />
            </div>
            <figcaption className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-700">Pie Chart</span>
              </div>
              <p className="text-sm text-gray-500">Proportional sentiment analysis</p>
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  </section>
);

export default ChartImages;
