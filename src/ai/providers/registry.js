export const PROVIDERS = {
  gemini: { name: "Google Gemini", requiresKey: true, defaultModel: "gemini-2.5-flash", keyUrl: "aistudio.google.com/apikey" },
  groq: { name: "Groq", requiresKey: true, defaultModel: "openai/gpt-oss-20b", keyUrl: "console.groq.com/keys" },
  openrouter: { name: "OpenRouter", requiresKey: true, defaultModel: "openai/gpt-oss-20b:free", keyUrl: "openrouter.ai/keys" },
  local: { name: "Offline (Local Engine)", requiresKey: false, defaultModel: "" },
};
