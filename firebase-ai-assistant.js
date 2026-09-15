// firebase-ai-assistant.js
// Production AI layer for Mr. Yoghurt.
// Requires a configured Firebase Web App and Firebase AI Logic.
// Firebase AI Logic can call Gemini from web apps and supports natural-language prompts.
// The system prompt asks Gemini to answer in the user's language automatically.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAI, getGenerativeModel, GoogleAIBackend } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-ai.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-3.8-flash" });

export async function askMrYoghurtAI(message, context = {}) {
  const prompt = `
You are Mr. Yoghurt's multilingual customer-service AI assistant.
Understand the language the customer uses (including Swahili, English, Arabic, French,
Spanish, Portuguese, Hindi and other languages) and answer in the same language unless
the customer asks for another language.
Be concise, friendly and useful. Never invent prices, order status, driver details or
payment confirmation. Use only the business context supplied below.
Business: fresh juices, yoghurt, detox and smoothies.
Order/WhatsApp: 0676475401.
Customer service: 0697983933.
Website: https://mr.yoghurt.com
Business context: ${JSON.stringify(context)}
Customer question: ${message}
`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

window.askMrYoghurtAI = askMrYoghurtAI;
