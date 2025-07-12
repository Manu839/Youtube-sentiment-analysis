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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtube_link: link })
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
    <div className="min-h-screen min-w-screen bg-green-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-green-800 mb-6 transition-all duration-500">
          {headingText}
        </h1>

        <YouTubeForm onSubmit={handleSubmit} />

        {error && (
          <div className="mt-4 text-red-600 font-semibold text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {data?.channel_info && <ChannelInfo info={data.channel_info} />}
        {data?.stats && <VideoStats stats={data.stats} link={youtubeLink} videoId={videoId} />}
        {data?.results && <SentimentResults results={data.results} />}
        {(data?.bar_chart_image || data?.pie_chart_image) && (
          <ChartImages bar={data.bar_chart_image} pie={data.pie_chart_image} />
        )}

        {data?.channel_info?.channel_description && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Channel Description</h3>
            <p className="text-gray-700">{data.channel_info.channel_description}</p>
          </div>
        )}
      </main>

      <footer className="bg-green-700 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} YouTube Sentiment Analysis
      </footer>
    </div>
  );
}

export default App;
