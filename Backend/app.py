from flask import Flask, request, jsonify
from flask_cors import CORS
from Sentiments import extract_video_id, analyze_sentiment, generate_bar_chart, generate_pie_chart
from comment import (
    save_video_comments_to_csv, get_channel_info,
    youtube, get_channel_id, get_video_stats
)
import os

app = Flask(__name__)
CORS(app)  

def delete_non_matching_csv_files(directory_path, video_id):
    for file_name in os.listdir(directory_path):
        if file_name.endswith('.csv') and file_name != f'{video_id}.csv':
            os.remove(os.path.join(directory_path, file_name))

@app.route('/', methods=['POST'])
def index():
    try:
        youtube_link = request.json.get('youtube_link')
        video_id = extract_video_id(youtube_link)

        if not video_id:
            return jsonify({'error': 'Invalid YouTube link'}), 400

        channel_id = get_channel_id(video_id)
        directory_path = os.getcwd()
        
        try:
            csv_file = save_video_comments_to_csv(video_id)
        except ValueError as ve:
            return jsonify({'error': str(ve)}), 403  # comments disabled
        
        delete_non_matching_csv_files(directory_path, video_id)

        channel_info = get_channel_info(youtube, channel_id)
        stats = get_video_stats(video_id)
        results = analyze_sentiment(csv_file)

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
    app.run(debug=True)
