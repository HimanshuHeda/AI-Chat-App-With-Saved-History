# 🤖 AI Chat Application with Persistent History

A full-stack web application where users can chat with an AI assistant. All conversations are stored in a backend database and persist across page refreshes.

## ✨ Features

- 💬 **Real-time AI Chat** - Interactive conversation with AI assistant
- 💾 **Persistent Storage** - All messages saved to SQLite database
- 🔄 **History Preservation** - Chat history restored on page reload
- 🎨 **Modern UI** - Clean, responsive React interface
- 🚀 **Easy Deployment** - Ready for Vercel, Railway, or Render

## 🏗️ Architecture

### Frontend (React)
- Modern React app with hooks
- Real-time message updates
- Auto-scroll to latest messages
- Loading states and error handling
- Responsive design for mobile/desktop

### Backend (Node.js + Express)
- RESTful API endpoints
- SQLite database for message persistence
- AI integration (OpenAI API compatible)
- CORS enabled for cross-origin requests
- Environment-based configuration

### Database (SQLite)
- Lightweight, file-based database
- Stores message history with timestamps
- No external database server required

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (or compatible AI service)

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo
```

Start the backend server:

```bash
npm start
```

Backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder (optional for development):

```env
REACT_APP_API_URL=http://localhost:3001
```

Start the frontend app:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

### 3. Test the Application

1. Open `http://localhost:3000` in your browser
2. Type a message and click Send
3. Watch the AI respond
4. Refresh the page - your chat history persists!

## 📡 API Endpoints

### GET `/api/health`
Health check endpoint
- **Response**: `{ status: 'ok', message: 'AI Chat Backend is running' }`

### GET `/api/messages`
Retrieve all chat history
- **Response**: `{ success: true, messages: [...] }`

### POST `/api/messages`
Send a new message and get AI response
- **Body**: `{ message: "Your message here" }`
- **Response**: `{ success: true, messages: [...], latestResponse: "..." }`

### DELETE `/api/messages`
Clear all chat history
- **Response**: `{ success: true, message: 'Chat history cleared' }`

## 🌐 Deployment Guide

### Deploying Backend (Railway/Render)

#### Option A: Railway (Recommended)

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `PORT` (Railway auto-assigns, but set to 3001 if needed)
6. Railway will auto-detect the backend folder and deploy
7. Copy the generated URL (e.g., `https://your-app.railway.app`)

#### Option B: Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add environment variables in Render dashboard
7. Deploy and copy the URL

### Deploying Frontend (Vercel/Netlify)

#### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL from Railway/Render
6. Update `frontend/vercel.json` with your actual backend URL
7. Deploy!

#### Option B: Netlify

1. Push your code to GitHub
2. Go to [Netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL
7. Deploy!

### Post-Deployment

1. Update `frontend/vercel.json` or `frontend/.env` with your actual backend URL
2. Redeploy the frontend
3. Test your live application!

## 🔧 Configuration

### AI Service Configuration

The app uses OpenAI API by default, but you can use any OpenAI-compatible endpoint:

```env
# OpenAI
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-3.5-turbo

# Azure OpenAI
AI_API_ENDPOINT=https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2024-02-15-preview

# Other providers (Anthropic via proxy, local models, etc.)
AI_API_ENDPOINT=your_endpoint_here
```

### Mock Mode (No API Key)

If you don't have an API key, the app will automatically use mock responses for testing.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Modern CSS with gradients and animations
- Fetch API for HTTP requests

**Backend:**
- Node.js
- Express.js
- better-sqlite3 (SQLite database)
- dotenv (environment variables)
- cors (cross-origin requests)

**AI Integration:**
- OpenAI API (or compatible)
- Configurable model and endpoints

## 📁 Project Structure

```
AI Chat App With Saved History/
├── backend/
│   ├── server.js           # Express server
│   ├── database.js         # SQLite database logic
│   ├── ai-service.js       # AI integration
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   ├── railway.toml        # Railway deployment config
│   └── render.yaml         # Render deployment config
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── vercel.json         # Vercel deployment config
│   └── .env.example        # Environment variables template
└── README.md               # This file
```

## 🧪 Testing Locally

1. Ensure both backend and frontend are running
2. Open browser to `http://localhost:3000`
3. Send test messages
4. Verify AI responses
5. Refresh page to confirm persistence
6. Test the Clear button

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify `.env` file exists with correct values
- Run `npm install` in backend folder

### Frontend can't connect to backend
- Ensure backend is running on port 3001
- Check CORS settings in `backend/server.js`
- Verify `REACT_APP_API_URL` in frontend `.env`

### AI responses not working
- Verify `OPENAI_API_KEY` is set correctly
- Check API endpoint is correct
- Review backend console for error messages
- Mock responses will be used if API fails

### Chat history not persisting
- Check if `chat.db` file is created in backend folder
- Verify SQLite database permissions
- Review backend logs for database errors

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🎯 Future Enhancements

- User authentication
- Multiple chat sessions
- Message editing/deletion
- File upload support
- Voice input
- Dark mode
- Export chat history
- Typing indicators
- Read receipts

---

Built with ❤️ using React, Node.js, and AI
