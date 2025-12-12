import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { saveMessage, getAllMessages, clearMessages } from './database.js';
import { generateAIResponse } from './ai-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Chat Backend is running' });
});

// Get all chat history
app.get('/api/messages', (req, res) => {
  try {
    const messages = getAllMessages();
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// Send a new message and get AI response
app.post('/api/messages', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Save user message
    saveMessage('user', message);

    // Get conversation history for context (last 10 messages)
    const allMessages = getAllMessages();
    const recentHistory = allMessages.slice(-10);

    // Generate AI response
    const aiResponse = await generateAIResponse(message, recentHistory);

    // Save AI response
    saveMessage('assistant', aiResponse);

    // Return the updated conversation
    const updatedMessages = getAllMessages();
    
    res.json({ 
      success: true, 
      messages: updatedMessages,
      latestResponse: aiResponse
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ success: false, error: 'Failed to process message' });
  }
});

// Clear all chat history (optional - useful for testing)
app.delete('/api/messages', (req, res) => {
  try {
    console.log('🗑️ Clear chat history request received');
    clearMessages();
    console.log('✅ Chat history cleared successfully');
    res.json({ success: true, message: 'Chat history cleared' });
  } catch (error) {
    console.error('Error clearing messages:', error);
    res.status(500).json({ success: false, error: 'Failed to clear messages' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Chat Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
