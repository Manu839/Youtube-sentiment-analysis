import React from 'react';

const ChannelInfo = ({ info }) => (
  <section className="bg-gradient-to-br from-white to-green-400/30 rounded-2xl shadow-xl p-8 border border-green-200/50 mt-16 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
    <div className="relative">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <h2 className="text-gray-800 text-3xl font-bold">Channel Overview</h2>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={info.channel_logo_url}
            alt="Channel Logo"
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-gray-800 mb-1">{info.channel_title}</p>
          <p className="text-gray-500 font-medium">@{info.channel_id}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 text-center">
        <Stat label="Subscribers" value={info.subscriber_count} icon="users" />
        <Stat label="Total Videos" value={info.video_count} icon="video" />
        <Stat
          label="Created"
          value={new Date(info.channel_created_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          icon="calendar"
        />
      </div>
    </div>

  </section>
);

const Stat = ({ label, value, icon }) => {
  const iconMap = {
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
      </svg>
    ),
    video: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    )
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 border border-green-100/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-center mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-md">
          {iconMap[icon]}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
    </div>
  );
};

export default ChannelInfo;
