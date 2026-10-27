import { beforeEach, describe, expect, it } from 'vitest';
import { initApp, navigate, render, state } from '../src/app.js';

describe('App routing and state', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    window.history.pushState({}, '', '/home');
    state.messages = [
      {
        id: 'welcome',
        role: 'model',
        text: 'Bienvenido, mortal.',
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    ];
    window.__voldemortAppInitialized = false;
  });

  it('renders the home view by default', () => {
    initApp();
    expect(document.body.textContent).toContain('Bienvenido a la experiencia');
  });

  it('navigates to the about view', () => {
    initApp();
    navigate('/about');
    expect(document.body.textContent).toContain('Sobre el proyecto');
  });

  it('renders the chat view and shows the conversation header', () => {
    initApp();
    navigate('/chat');
    expect(document.body.textContent).toContain('Conversación activa');
  });

  it('keeps messages in state and appends a user message', () => {
    const originalLength = state.messages.length;
    state.messages = [...state.messages, { role: 'user', text: 'Hola', timestamp: new Date().toISOString() }];
    expect(state.messages).toHaveLength(originalLength + 1);
    expect(state.messages.at(-1).role).toBe('user');
  });
});
