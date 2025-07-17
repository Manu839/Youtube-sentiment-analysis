import csv, ssl, time, warnings
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os
from dotenv import load_dotenv

warnings.filterwarnings("ignore")

# ────────────────────────────────────────────────────────────
# 1.  CONFIG
# ────────────────────────────────────────────────────────────
load_dotenv()

DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
YOUTUBE_API_SERVICE_NAME = os.getenv("YOUTUBE_API_SERVICE_NAME")
YOUTUBE_API_VERSION= os.getenv("YOUTUBE_API_VERSION")       = "v3"

import google.auth.transport.requests
from googleapiclient.discovery import build
from google.auth.transport.requests import Request

import httplib2
import googleapiclient.discovery
import googleapiclient.errors

# Force plain HTTP (less secure - dev only)
http = httplib2.Http(disable_ssl_certificate_validation=True)

youtube = build(
    YOUTUBE_API_SERVICE_NAME,
    YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY,
    cache_discovery=False,
    http=http
)

# ────────────────────────────────────────────────────────────
# 2.  HELPER: retry‑safe request.execute()
# ────────────────────────────────────────────────────────────
def robust_execute(request, retries: int = 3, delay: int = 2):
    """
    Execute a googleapiclient request with basic retry logic that
    handles transient SSL / HTTP errors.

    Raises on final failure.
    """
    for attempt in range(1, retries + 1):
        try:
            return request.execute()
        except (ssl.SSLError, HttpError) as exc:
            # ‑‑ Handle 403 commentsDisabled right away so caller can act
            if isinstance(exc, HttpError) and exc.resp.status == 403:
                raise
            if attempt == retries:
                raise
            print(f"⚠️  Google API call failed ({exc}); retry {attempt}/{retries} …")
            time.sleep(delay)


# ────────────────────────────────────────────────────────────
# 3.  PUBLIC FUNCTIONS  (signature unchanged)
# ────────────────────────────────────────────────────────────
def get_channel_id(video_id: str) -> str:
    response = robust_execute(
        youtube.videos().list(part="snippet", id=video_id)
    )
    return response["items"][0]["snippet"]["channelId"]


def save_video_comments_to_csv(video_id: str) -> str:
    """
    Download every top‑level comment for the given video ID and save to
    <video_id>.csv.  Returns the CSV filename.

    Raises:
        ValueError if comments are disabled (HTTP 403 from YouTube).
    """
    comments = []

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
            snippet  = item["snippet"]["topLevelComment"]["snippet"]
            username = snippet["authorDisplayName"]
            comment  = snippet["textDisplay"]
            comments.append([username, comment])

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

    filename = f"{video_id}.csv"
    with open(filename, "w", newline="", encoding="utf‑8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Username", "Comment"])
        writer.writerows(comments)

    return filename


def get_video_stats(video_id: str):
    try:
        response = robust_execute(
            youtube.videos().list(part="statistics", id=video_id)
        )
        return response["items"][0]["statistics"]
    except HttpError as error:
        print(f"An error occurred: {error}")
        return None


def get_channel_info(youtube_obj, channel_id: str):
    try:
        response = robust_execute(
            youtube_obj.channels().list(
                part="snippet,statistics,brandingSettings", id=channel_id
            )
        )
        item = response["items"][0]

        return {
            "channel_title":      item["snippet"]["title"],
            "video_count":        item["statistics"]["videoCount"],
            "channel_logo_url":   item["snippet"]["thumbnails"]["high"]["url"],
            "channel_created_date": item["snippet"]["publishedAt"],
            "subscriber_count":   item["statistics"]["subscriberCount"],
            "channel_description": item["snippet"]["description"],
        }

    except HttpError as error:
        print(f"An error occurred: {error}")
        return None
