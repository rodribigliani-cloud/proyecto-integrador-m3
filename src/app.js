import { CHARACTER_NAME, CHARACTER_PROMPT, createMessage, formatTime, readHistory, saveHistory, clearHistory } from './utils.js';

const DEFAULT_MESSAGES = [
  createMessage('model', 'Ah, por fin alguien se atreve a hablar conmigo. ¿Qué deseas saber, mortal?'),
];

export const state = {
  messages: readHistory().length ? readHistory() : DEFAULT_MESSAGES,
};

const appRoot = () => document.querySelector('#app');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderLayout(content) {
  appRoot().innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark">V</span>
          <div>
            <p class="eyebrow">Personaje</p>
            <h1>Voldemort</h1>
          </div>
        </div>
        <nav class="nav" aria-label="Navegación principal">
          <a href="/home" class="nav-link" data-route="/home">Home</a>
          <a href="/chat" class="nav-link" data-route="/chat">Chat</a>
          <a href="/about" class="nav-link" data-route="/about">About</a>
        </nav>
      </header>
      <main class="page">${content}</main>
    </div>
  `;

  appRoot().querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const path = link.dataset.route;
      navigate(path);
    });
  });
}

export function navigate(path) {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  const nextPath = safePath === '/' ? '/home' : safePath;
  window.history.pushState({}, '', nextPath);
  render();
}

function renderHome() {
  renderLayout(`
    <section class="panel hero">
      <div class="hero-copy">
        <p class="eyebrow">Bienvenido a la experiencia</p>
        <h2>Habla con el Señor Oscuro</h2>
        <p>
          Esta SPA te permite charlar con una versión ficcionada de Lord Voldemort,
          con una personalidad agresiva, ambiciosa y fascinante.
        </p>
        <button class="primary-button" data-route="/chat">Empezar a chatear</button>
      </div>
      <div class="hero-card">
        <div class="portrait">V</div>
        <p>"La verdadera fuerza no se mide por el miedo, sino por la voluntad."</p>
      </div>
    </section>
  `);

  appRoot().querySelector('[data-route="/chat"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('/chat');
  });
}

function renderAbout() {
  renderLayout(`
    <section class="panel about">
      <h2>Sobre el proyecto</h2>
      <p>
        Esta aplicación es una SPA responsive creada para chatear con un personaje ficticio
        utilizando una estructura de rutas basada en History API.
      </p>
      <p>
        El personaje elegido es <strong>${CHARACTER_NAME}</strong>, con una personalidad calculadora,
        arrogante y dominante, ideal para un sistema de prompt bien definido.
      </p>
      <ul class="feature-list">
        <li>Routing con History API</li>
        <li>Diseño mobile-first</li>
        <li>Integración segura con Gemini</li>
        <li>Pruebas con Vitest</li>
      </ul>
    </section>
  `);
}

function showTypingIndicator(show) {
  const indicator = document.querySelector('#typingIndicator');
  if (!indicator) return;
  indicator.classList.toggle('visible', show);
}

function buildChatMarkup() {
  const messages = state.messages;

  return `
    <section class="panel chat-panel">
      <div class="chat-header">
        <div>
          <p class="eyebrow">Conversación activa</p>
          <h2>${CHARACTER_NAME}</h2>
        </div>
        <button id="clearHistory" class="ghost-button" type="button">Borrar historial</button>
      </div>

      <div id="chatMessages" class="chat-messages" aria-live="polite">
        ${messages
          .map(
            (message) => `
              <article class="message ${message.role === 'user' ? 'user-message' : 'bot-message'}">
                <div class="message-header">
                  <span>${message.role === 'user' ? 'Tú' : CHARACTER_NAME}</span>
                  <time>${formatTime(new Date(message.timestamp))}</time>
                </div>
                <p>${escapeHtml(message.text)}</p>
              </article>
            `,
          )
          .join('')}
      </div>

      <div id="typingIndicator" class="typing-indicator" aria-live="polite">
        <span></span><span></span><span></span>
        <small>${CHARACTER_NAME} está escribiendo...</small>
      </div>

      <form id="chatForm" class="chat-form">
        <label class="sr-only" for="chatInput">Tu mensaje</label>
        <textarea id="chatInput" rows="1" placeholder="Escribe tu mensaje..."></textarea>
        <button type="submit" class="primary-button">Enviar</button>
      </form>
    </section>
  `;
}

function renderChat() {
  renderLayout(buildChatMarkup());

  const form = document.querySelector('#chatForm');
  const textarea = document.querySelector('#chatInput');
  const clearButton = document.querySelector('#clearHistory');

  textarea?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form?.requestSubmit();
    }
  });

  clearButton?.addEventListener('click', () => {
    state.messages = [createMessage('model', 'El historial ha sido borrado. ¿Qué más quieres saber, mortal?')];
    clearHistory();
    saveHistory(state.messages);
    renderChat();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = textarea.value.trim();

    if (!message) {
      return;
    }

    const userMessage = createMessage('user', message);
    state.messages = [...state.messages, userMessage];
    saveHistory(state.messages);
    renderChat();
    textarea.focus();
    showTypingIndicator(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: state.messages,
          characterPrompt: CHARACTER_PROMPT,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'La petición falló.');
      }

      const botReply = data.reply || 'No pude preparar una respuesta adecuada.';
      state.messages = [...state.messages, createMessage('model', botReply)];
    } catch (error) {
      state.messages = [
        ...state.messages,
        createMessage(
          'model',
          'He sufrido una perturbación en mi dominio. Intenta de nuevo en unos instantes.',
        ),
      ];
    } finally {
      showTypingIndicator(false);
      saveHistory(state.messages);
      renderChat();
    }
  });

  const chatMessages = document.querySelector('#chatMessages');
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

export function render() {
  const path = window.location.pathname || '/home';

  if (path === '/chat') {
    renderChat();
    return;
  }

  if (path === '/about') {
    renderAbout();
    return;
  }

  renderHome();
}

export function initApp() {
  if (window.__voldemortAppInitialized) {
    return;
  }

  window.__voldemortAppInitialized = true;
  window.addEventListener('popstate', render);
  render();
}
