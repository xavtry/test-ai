import axios from 'axios';

export async function sendMessage(messages, systemPrompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-20) // last 20 messages
      ],
      temperature: 1.0,
      max_tokens: 1000
    },
    {
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Sebastian's Brainrot AI"
      }
    }
  );

  return response.data.choices[0].message.content;
}
