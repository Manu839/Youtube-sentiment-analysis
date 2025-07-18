from flask import Flask, request, jsonify
from flask_cors import CORS
from Sentiments import extract_video_id, analyze_sentiment, generate_bar_chart, generate_pie_chart
from comment import (
    save_video_comments_to_csv, get_channel_info,
    youtube, get_channel_id, get_video_stats
)
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

def delete_non_matching_csv_files(directory_path, video_id):
    for file_name in os.listdir(directory_path):
        if file_name.endswith('.csv') and file_name != f'{video_id}.csv':
            os.remove(os.path.join(directory_path, file_name))

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
        print("📺 Channel ID:", channel_id)

        directory_path = os.getcwd()
        print("📁 Current working directory:", directory_path)

        try:
            print("📥 Downloading comments...")
            csv_file = save_video_comments_to_csv(video_id)
            print("✅ Comments saved to:", csv_file)
        except ValueError as ve:
            return jsonify({'error': str(ve)}), 403

        delete_non_matching_csv_files(directory_path, video_id)
        print("🧹 Old CSVs cleaned up.")

        print("📊 Fetching channel info...")
        channel_info = get_channel_info(youtube, channel_id)
        print("✅ Channel info fetched.")

        print("📈 Getting video stats...")
        stats = get_video_stats(video_id)
        print("✅ Stats received.")

        print("🧠 Analyzing sentiment...")
        results = analyze_sentiment(csv_file)
        print("✅ Sentiment analysis complete:", results)

        print("🖼 Generating charts...")
        bar_chart_image = generate_bar_chart(results)
        pie_chart_image = generate_pie_chart(results)
        print("✅ Charts generated.")

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
    import os
    os.environ["FLASK_RUN_FROM_CLI"] = "false"
    app.run(debug=True, use_reloader=False)
