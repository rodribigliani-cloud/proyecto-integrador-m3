import { GEMINI_ENDPOINT } from '../index.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Método no permitido.' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {});
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const characterPrompt = body.characterPrompt || 'Eres Lord Voldemort.';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return response.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en las variables de entorno del servidor.' });
    }

    const payload = {
      systemInstruction: {
        parts: [{ text: characterPrompt }],
      },
      contents: messages
        .filter((message) => message && typeof message.text === 'string' && message.text.trim())
        .map((message) => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.text.trim() }],
        })),
    };

    const geminiResponse = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      throw new Error(data?.error?.message || 'Error al consultar Gemini.');
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text)
      .filter(Boolean)
      .join(' ')
      .trim();

    return response.status(200).json({
      reply: reply || 'La respuesta del personaje no está disponible en este momento.',
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message || 'Ocurrió un error inesperado.',
    });
  }
}
