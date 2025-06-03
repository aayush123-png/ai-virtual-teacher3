const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load TOGETHER_API_KEY from environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ AI Virtual Teacher backend is running (Together AI)');
});

// Main AI route
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
- NEVER say things like “Sure, I’d be happy to help.”
- DO NOT use chatbot filler or emojis.
- ALWAYS give clear answers using:
  - Bullet points
  - Numbered steps
  - Line breaks
  - Headings
- Avoid jokes and keep your tone serious.
- Add simple examples if helpful.
- If the question is unclear, ask for clarification instead of guessing.
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

    // Log for debugging
    console.log("Together AI Response:", JSON.stringify(response.data, null, 2));

    // Safe access to AI reply
    const reply = response.data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'No valid reply from AI' });
    }

    res.json({ reply });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'AI response failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
