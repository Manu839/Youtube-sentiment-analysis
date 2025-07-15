import React from 'react';

const ChannelInfo = ({ info }) => (
  <section className="bg-white rounded-xl shadow p-6 border border-green-200">
    <h2 className="text-green-700 text-xl font-bold mb-4">Channel Overview</h2>

    <div className="flex items-center gap-4 mb-6">
      <img
        src={info.channel_logo_url}
        alt="Channel Logo"
        className="w-20 h-20 rounded-full border-4 border-green-300"
      />
      <div>
        <p className="text-2xl font-extrabold">{info.channel_title}</p>
        <p className="text-sm text-gray-500">@{info.channel_id}</p>
      </div>
    </div>

<div className="grid sm:grid-cols-3 gap-4 text-center">
  <Stat label="Subscribers" value={info.subscriber_count} />
  <Stat label="Total Videos" value={info.video_count} />
  <Stat
    label="Created"
    value={new Date(info.channel_created_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  />
</div>

  </section>
);

const Stat = ({ label, value }) => (
  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
    <p className="text-lg font-semibold text-green-800">{value}</p>
    <p className="text-xs uppercase tracking-wide text-gray-600">{label}</p>
  </div>
);

export default ChannelInfo;
