import dotenv from 'dotenv';
dotenv.config();

/**
 * Call AI service to generate a response
 * This implementation uses Google Gemini API
 */
export async function generateAIResponse(userMessage, conversationHistory = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.AI_MODEL || 'gemini-pro';

  if (!apiKey) {
    // Fallback to mock AI response if no API key
    console.warn('No GEMINI_API_KEY found. Using mock AI response.');
    return getMockAIResponse(userMessage);
  }

  try {
    // Build conversation context for Gemini
    let conversationText = '';
    
    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        if (msg.role === 'user') {
          conversationText += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          conversationText += `Assistant: ${msg.content}\n`;
        }
      });
    }
    
    // Add current user message
    conversationText += `User: ${userMessage}\nAssistant:`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationText
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini AI service:', error);
    // Fallback to mock response
    return getMockAIResponse(userMessage);
  }
}

/**
 * Mock AI response for testing or when API is unavailable
 */
function getMockAIResponse(userMessage) {
  const responses = [
    `I received your message: "${userMessage}". This is a mock response since no AI API key is configured.`,
    `That's interesting! You said: "${userMessage}". Please configure your AI API key for real responses.`,
    `Thanks for your message about "${userMessage}". I'm currently in demo mode - set OPENAI_API_KEY to enable real AI responses.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
