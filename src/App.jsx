import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import YouTubeForm from './components/YoutubeForm';
import ChannelInfo from './components/ChannelInfo';
import VideoStats from './components/VideoStats';
import SentimentResults from './components/SentimentResults';
import ChartImages from './components/ChartImages';

function App() {
  const [data, setData] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [youtubeLink, setYouTubeLink] = useState('');
  const [headingText, setHeadingText] = useState('');
  const [error, setError] = useState(null);

  const headings = [
  "YouTube Sentiment Analysis",
  "Understand Audience Reactions Instantly",
  "Visualize Feedback with AI-powered Charts"
  ];

  useEffect(() => {
    let index = 0;
    setHeadingText(headings[0]);
    const interval = setInterval(() => {
      index = (index + 1) % headings.length;
      setHeadingText(headings[index]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (link) => {
      console.log("🟢 Calling backend with:", link);   
    setYouTubeLink(link);
    setError(null);
    setData(null);

    try {
const response = await fetch('http://localhost:5000/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ youtube_link: link }),
  mode: 'cors'
});

        console.log("🟠 fetch returned – status:", response.status); 

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Something went wrong');
        return;
      }

      setData(result);
      setVideoId(result.video_id);
    } catch (err) {
      setError('Could not connect to the server. Please ensure Flask backend is running.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 via-green-400/80 to-green-50/30 text-gray-800 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-600 bg-clip-text text-transparent mb-4 transition-all duration-500">
          {headingText}
        </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover what your audience really thinks with AI-powered sentiment analysis of YouTube comments
          </p>
        </div>

        <YouTubeForm onSubmit={handleSubmit} />

        {error && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Analysis Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {data?.channel_info && <ChannelInfo info={data.channel_info} />}
        {data?.stats && <VideoStats stats={data.stats} link={youtubeLink} videoId={videoId} />}
        {data?.results && <SentimentResults results={data.results} />}
        {(data?.bar_chart_image || data?.pie_chart_image) && (
          <ChartImages bar={data.bar_chart_image} pie={data.pie_chart_image} />
        )}

        {data?.channel_info?.channel_description && (
          <div className="mt-8 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-xl p-8 border border-gray-200/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-500/5"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Channel Description</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">{data.channel_info.channel_description}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold">YT</span>
            </div>
            <span className="text-xl font-semibold">YouTube Sentiment Analysis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
