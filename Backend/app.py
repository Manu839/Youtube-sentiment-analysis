from flask import Flask, request, jsonify
from flask_cors import CORS
from Sentiments import extract_video_id, analyze_sentiment, generate_bar_chart, generate_pie_chart
from comment import (
    fetch_and_store_comments, get_channel_info,
    youtube, get_channel_id, get_video_stats
)
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/', methods=['POST'])
def index():
    try:
        youtube_link = request.json.get('youtube_link')
        print("✅ Received request JSON:", request.json)

        video_id = extract_video_id(youtube_link)
        print("🎯 Extracted video ID:", video_id)

        if not video_id:
            return jsonify({'error': 'Invalid YouTube link'}), 400

        channel_id = get_channel_id(video_id)
        print("📥 Downloading comments...")
        comments = fetch_and_store_comments(video_id)

        print("🧠 Analyzing sentiment...")
        results = analyze_sentiment(comments)

        print("📊 Fetching channel info...")
        channel_info = get_channel_info(youtube, channel_id)

        print("📈 Getting video stats...")
        stats = get_video_stats(video_id)

        print("🖼 Generating charts...")
        bar_chart_image = generate_bar_chart(results)
        pie_chart_image = generate_pie_chart(results)

        return jsonify({
            "video_id": video_id,
            "channel_info": channel_info,
            "stats": stats,
            "results": results,
            "bar_chart_image": bar_chart_image,
            "pie_chart_image": pie_chart_image
        })

    except Exception as e:
        print("❌ Error occurred:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    os.environ["FLASK_RUN_FROM_CLI"] = "false"
    app.run(debug=True, use_reloader=False)
