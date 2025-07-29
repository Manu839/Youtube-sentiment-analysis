<img width="1253" height="843" alt="image" src="https://github.com/user-attachments/assets/6e9f4bd5-7574-4359-953b-1fba029641c2" /># 🎥 YouTube Sentiment Analysis App

A full-stack application that analyzes the sentiment of comments on YouTube videos using the Google YouTube Data API and VADER sentiment analysis. The app features a React + Tailwind CSS frontend and a Python Flask backend.

---

## 🚀 Features

- 🔗 Submit any YouTube video link  
- 💬 Scrape comments using the YouTube Data API  
- 🧠 Comments are stored in **MongoDB** for caching and future reuse  
- 🤖 Perform sentiment analysis (Positive, Negative, Neutral) using VADER  
- 📊 Display sentiment results in Bar and Pie Charts  
- 📈 Show video stats like views, likes, comments  
- 👤 Show channel info and description  
- 🌿 Light green-themed, responsive UI

---

## Results 

<img width="1462" height="792" alt="Screenshot 2025-07-29 123023" src="https://github.com/user-attachments/assets/646154d6-15d6-496d-91d7-1ae69294c0c8" />

<img width="1351" height="827" alt="Screenshot 2025-07-29 123354" src="https://github.com/user-attachments/assets/11fa8c30-8487-469c-8451-455a852a6a20" />

<img width="1253" height="843" alt="Screenshot 2025-07-29 123429" src="https://github.com/user-attachments/assets/63837fbb-4d2b-4a17-b5d2-ffed3952fc22" />

<img width="462" height="643" alt="backend" src="https://github.com/user-attachments/assets/d72da2ff-4024-41f3-9e0c-b1487370534b" />



## 🧱 Tech Stack

### 🖥 Frontend
- React.js  
- Tailwind CSS  
- Vite  
- Chart rendering with Plotly (via base64 images)

### 🔥 Backend
- Python 3.10+  
- Flask  
- Flask-CORS  
- NLTK (VADER SentimentIntensityAnalyzer)  
- Pandas & CSV handling  
- Plotly for chart generation  
- Google API Client (`google-api-python-client`)  
- **MongoDB (via PyMongo)** – for storing YouTube comments

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js (v18 or above)  
- Python (3.10 or above)  
- Google Developer Account with YouTube Data API enabled  
- A valid YouTube Data API key  
- **MongoDB installed locally or hosted (MongoDB Atlas)**

---

### 📁 Clone the Repository

```bash
git clone https://github.com/Manu839/Youtube-sentiment-analysis.git
cd yt-sentiment-analysis
```

## 📦 Backend Setup (Flask)
### 🔹 Navigate to backend directory:

``` bash
cd backend
python -m venv env
source env/bin/activate   # Or: env\Scripts\activate on Windows
pip install -r requirements.txt
```

### 🔹 Set your API Key

- DEVELOPER_KEY=YOUR_YOUTUBE_API_KEY_HERE
- MONGO_URI=mongodb://localhost:27017   # Or your MongoDB Atlas URI
- MONGO_DB=yt_sentiment
  
### 🔹 Run the Flask server
```bash
python app.py
```
- Server will run at: http://localhost:5000

## 🌐 Frontend Setup (React + Vite)

### 🔹 Navigate to frontend directory:
``` bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

## 🐛 Troubleshooting
- Error 403: commentsDisabled – This video has comments disabled.
- [SSL: WRONG_VERSION_NUMBER] – Try switching network or disabling proxy/VPN.
- Frontend not showing results – Check backend logs and CORS setup.
- 500 errors – Make sure API key is valid, and YouTube quotas aren’t exhausted.

## 💡 Future Improvements
- OAuth2 user authentication
- Show most liked/positive/negative comments
- Download report as PDF
- Dark mode theme
- Multi-language sentiment support

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
