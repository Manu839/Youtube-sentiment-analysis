import React from 'react';

const VideoStats = ({ stats, link, videoId }) => (
  <section className="bg-white rounded-xl shadow p-6 border border-green-200">
    <h2 className="text-green-700 text-xl font-bold mb-4">Video Stats</h2>

    <div className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
      <Stat label="Views" value={stats.viewCount} />
      <Stat label="Likes" value={stats.likeCount} />
      <Stat label="Comments" value={stats.commentCount} />
    </div>

    <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>

    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-green-700 font-medium hover:underline"
    >
      Watch on YouTube →
    </a>
  </section>
);

const Stat = ({ label, value }) => (
  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
    <p className="text-lg font-semibold text-green-800">{value}</p>
    <p className="text-xs uppercase tracking-wide text-gray-600">{label}</p>
  </div>
);

export default VideoStats;
