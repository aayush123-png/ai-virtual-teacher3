const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
            content: "You are an AI teacher. Give structured answers using bullets, line breaks, and step-by-step format."
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

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error contacting Together AI' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
