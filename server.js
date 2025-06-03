const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Loads TOGETHER_API_KEY from environment

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ AI Virtual Teacher backend is running (Together AI)');
});

// Main AI POST route
app.post('/ask', async (req, res) => {
  const { userMessage } = req.body;

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'system',
            content: `
You are a strict, helpful, and smart AI teacher built for school students.
- NEVER say things like “Sure, I’d be happy to help” or “Of course!”
- Do NOT use chatbot phrases or filler.
- ALWAYS use clear headings, bullet points, numbered steps, and line breaks.
- Avoid jokes, emojis, and informal tone.
- Your tone must be professional, focused, and instructional.
- Add examples where appropriate.
- Keep answers brief but complete.
- If the question is unclear, ask for clarification before answering.
            `.trim()
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'AI response failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
