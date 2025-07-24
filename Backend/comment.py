import time
import ssl
import os
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from pymongo import MongoClient
from dotenv import load_dotenv
import warnings

warnings.filterwarnings("ignore")
load_dotenv()

# YouTube API setup
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

youtube = build(
    YOUTUBE_API_SERVICE_NAME,
    YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY,
    cache_discovery=False
)

# MongoDB setup = mongodb://localhost:27017
client = MongoClient("")
db = client["youtube_sentiment"]
comments_collection = db["comments"]

# Retry logic
def robust_execute(request, retries: int = 3, delay: int = 2):
    for attempt in range(1, retries + 1):
        try:
            return request.execute()
        except (ssl.SSLError, HttpError) as exc:
            if isinstance(exc, HttpError) and exc.resp.status == 403:
                raise
            if attempt == retries:
                raise
            print(f"⚠️ Google API failed ({exc}); retry {attempt}/{retries} …")
            time.sleep(delay)

# Fetch channel ID
def get_channel_id(video_id: str) -> str:
    response = robust_execute(
        youtube.videos().list(part="snippet", id=video_id)
    )
    return response["items"][0]["snippet"]["channelId"]

# Fetch and store comments in MongoDB
def fetch_and_store_comments(video_id: str) -> list:
    all_comments = []

    try:
        results = robust_execute(
            youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=100,
            )
        )
    except HttpError as e:
        if e.resp.status == 403:
            raise ValueError("Comments are disabled for this video.") from e
        raise

    while results:
        for item in results["items"]:
            snippet = item["snippet"]["topLevelComment"]["snippet"]
            comment_data = {
                "video_id": video_id,
                "author": snippet["authorDisplayName"],
                "text": snippet["textDisplay"],
                "like_count": snippet.get("likeCount", 0),
                "published_at": snippet["publishedAt"],
            }
            all_comments.append(comment_data)

        next_token = results.get("nextPageToken")
        if not next_token:
            break

        results = robust_execute(
            youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=100,
                pageToken=next_token,
            )
        )

    # Save to MongoDB
    comments_collection.delete_many({"video_id": video_id})
    if all_comments:
        comments_collection.insert_many(all_comments)

    return all_comments

# Get video stats
def get_video_stats(video_id: str):
    try:
        response = robust_execute(
            youtube.videos().list(part="statistics", id=video_id)
        )
        return response["items"][0]["statistics"]
    except HttpError as error:
        print(f"An error occurred: {error}")
        return None

# Get channel info
def get_channel_info(youtube_obj, channel_id: str):
    try:
        response = robust_execute(
            youtube_obj.channels().list(
                part="snippet,statistics,brandingSettings", id=channel_id
            )
        )
        item = response["items"][0]

        return {
            "channel_title": item["snippet"]["title"],
            "video_count": item["statistics"]["videoCount"],
            "channel_logo_url": item["snippet"]["thumbnails"]["high"]["url"],
            "channel_created_date": item["snippet"]["publishedAt"],
            "subscriber_count": item["statistics"]["subscriberCount"],
            "channel_description": item["snippet"]["description"],
        }

    except HttpError as error:
        print(f"An error occurred: {error}")
        return None
