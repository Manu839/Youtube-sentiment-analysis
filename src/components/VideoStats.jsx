import React from 'react';

const VideoStats = ({ stats, link, videoId }) => (
  <section className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl mt-10 p-8 border border-blue-200/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
    <div className="relative">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12 6.5z"/>
          </svg>
        </div>
        <h2 className="text-gray-800 text-3xl font-bold">Video Statistics</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8 text-center">
        <Stat label="Views" value={stats.viewCount} icon="eye" color="blue" />
        <Stat label="Likes" value={stats.likeCount} icon="heart" color="red" />
        <Stat label="Comments" value={stats.commentCount} icon="chat" color="purple" />
      </div>

      <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="text-center">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Watch on YouTube</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
);

const Stat = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  };

  const iconMap = {
    eye: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    chat: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    )
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-center mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${colorMap[color]} rounded-lg flex items-center justify-center text-white shadow-md`}>
          {iconMap[icon]}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
    </div>
  );
};

export default VideoStats;
