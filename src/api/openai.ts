import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const transcribeAudio = async (audioFile: Blob) => {
  const response = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-large-v3',
    language: 'pt',
  });
  return response.text;
};

export const generateSOAPReport = async (transcript: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Gere relatório SOAP em JSON' },
      { role: 'user', content: transcript },
    ],
  });
  return response.choices[0].message.content;
};