import { describe, it, expect } from 'vitest';
import { buildGeminiPayload, formatTime, parseGeminiResponse } from '../src/utils.js';

describe('Utility helpers', () => {
  it('formats hours in a readable time format', () => {
    const time = formatTime(new Date('2024-01-01T18:05:00Z'));
    expect(time).toMatch(/\d{2}:\d{2}/);
  });

  it('builds a valid Gemini payload with a system instruction', () => {
    const payload = buildGeminiPayload([
      { role: 'user', text: '¿Qué es la oscuridad?' },
      { role: 'model', text: 'La oscuridad es poder.' },
    ]);

    expect(payload.systemInstruction.parts[0].text).toContain('Lord Voldemort');
    expect(payload.contents).toHaveLength(2);
    expect(payload.contents[0].role).toBe('user');
  });

  it('extracts text from a Gemini API response', () => {
    const text = parseGeminiResponse({
      candidates: [{ content: { parts: [{ text: 'Nunca subestimes el poder del miedo.' }] } }],
    });

    expect(text).toBe('Nunca subestimes el poder del miedo.');
  });
});
