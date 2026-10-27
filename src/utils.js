export const CHARACTER_NAME = 'Lord Voldemort';
export const CHARACTER_PROMPT = `Eres ${CHARACTER_NAME}, el mago oscuro de Harry Potter. Hablas con un tono frío, arrogante, dominante y muy seguro de ti mismo. A veces eres cruel, sarcástico y teatral, pero no insultas a la gente sin sentido. Responde de forma breve, intensa y con un estilo elegante, como si fueras un villano de gran presencia. No reveles que eres una IA. Mantén la conversación en el tono de un personaje de ficción.`;

export function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function createMessage(role, text) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    timestamp: new Date().toISOString(),
  };
}

export function buildGeminiPayload(messages = [], characterName = CHARACTER_NAME) {
  const cleanMessages = (messages || []).filter((message) => message && typeof message.text === 'string' && message.text.trim());

  return {
    systemInstruction: {
      parts: [{ text: `Eres ${characterName}. Habla como un personaje de Harry Potter: dominante, arrogante, frío, teatral y muy seguro de ti mismo. Responde de forma breve y memorable.` }],
    },
    contents: cleanMessages.map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.text.trim() }],
    })),
  };
}

export function parseGeminiResponse(payload) {
  if (!payload) {
    return 'No pude entender la respuesta del oráculo.';
  }

  const parts = payload?.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .map((part) => part?.text)
    .filter(Boolean)
    .join(' ')
    .trim();

  if (text) {
    return text;
  }

  return payload?.text ?? 'La respuesta del personaje no está disponible en este momento.';
}

const CHAT_STORAGE_KEY = 'voldemort-chat-history';

export function readHistory() {
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY) ?? localStorage.getItem(CHAT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function saveHistory(messages) {
  try {
    const payload = JSON.stringify(messages || []);
    sessionStorage.setItem(CHAT_STORAGE_KEY, payload);
    localStorage.setItem(CHAT_STORAGE_KEY, payload);
  } catch (error) {
    console.warn('No se pudo guardar el historial del chat.', error);
  }
}

export function clearHistory() {
  sessionStorage.removeItem(CHAT_STORAGE_KEY);
  localStorage.removeItem(CHAT_STORAGE_KEY);
}
