import re
import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import plotly.express as px
import plotly.graph_objects as go
import base64
from io import BytesIO

nltk.download('vader_lexicon')

def extract_video_id(youtube_link):
    video_id_regex = r"^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})"
    match = re.search(video_id_regex, youtube_link)
    return match.group(1) if match else None

def analyze_sentiment(comments_list):
    sid = SentimentIntensityAnalyzer()

    num_neutral = 0
    num_positive = 0
    num_negative = 0

    for comment_data in comments_list:
        comment = comment_data.get('text', '')
        sentiment_scores = sid.polarity_scores(comment)

        if sentiment_scores['compound'] == 0.0:
            num_neutral += 1
            sentiment = 'neutral'
        elif sentiment_scores['compound'] > 0.0:
            num_positive += 1
            sentiment = 'positive'
        else:
            num_negative += 1
            sentiment = 'negative'

        comment_data['sentiment'] = sentiment
        comment_data['compound'] = sentiment_scores['compound']

    results = {
        'num_neutral': num_neutral,
        'num_positive': num_positive,
        'num_negative': num_negative
    }

    return results

def generate_bar_chart(results):
    df = pd.DataFrame({
        'Sentiment': ['Positive', 'Negative', 'Neutral'],
        'Number of Comments': [
            results.get('num_positive', 0),
            results.get('num_negative', 0),
            results.get('num_neutral', 0)
        ]
    })

    fig = px.bar(
        df,
        x='Sentiment',
        y='Number of Comments',
        color='Sentiment',
        color_discrete_sequence=['#4CAF50', '#FF5733', '#00B3B6'],
    )

    fig.update_layout(
        title='Sentiment Analysis Results (Bar Plot)',
        margin=dict(t=60, r=20, b=60, l=40),
        font=dict(family='Arial', size=15, color='#505050'),
        plot_bgcolor='#f8f9fa',
        paper_bgcolor='#f8f9fa',
    )

    return save_chart_image(fig)

def generate_pie_chart(results):
    fig = go.Figure(data=[go.Pie(
        labels=['Neutral', 'Positive', 'Negative'],
        values=[
            results.get('num_neutral', 0),
            results.get('num_positive', 0),
            results.get('num_negative', 0)
        ],
        textinfo='label+percent',
        marker=dict(colors=['#FFD700', '#90EE90', '#FF6347']),
        hole=0.5,
    )])

    fig.update_layout(
        title='Sentiment Analysis Results (Pie Plot)',
        margin=dict(t=60, r=20, b=60, l=40),
        font=dict(family='Arial', size=15, color='#505050'),
        plot_bgcolor='#f8f9fa',
        paper_bgcolor='#f8f9fa',
    )

    return save_chart_image(fig)

def save_chart_image(fig):
    image_stream = BytesIO()
    fig.write_image(image_stream, format="png")
    image_stream.seek(0)
    encoded_image = base64.b64encode(image_stream.read()).decode("utf-8")
    return f"data:image/png;base64,{encoded_image}"
