import { createClient } from 'supabase';
import OpenAI from 'openai';

export const handler = async (event, context) => {
  const { record } = JSON.parse(event.body);           // fila via storage webhook
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const openai   = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  // 1. baixa o áudio
  const { data } = await supabase.storage.from('audio').download(record.name);

  // 2. Whisper
  const transcript = await openai.audio.transcriptions.create({
      file: data,
      model: 'whisper-large-v3',
      language: 'pt'
  });

  // 3. GPT-4o-mini → SOAP
  const gpt = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Gere relatório SOAP em JSON' },
      { role: 'user', content: transcript.text }
    ]
  });

  // 4. salva
  await supabase.from('reports').insert({
      consultation_id: record.metadata.consultation_id,
      soap: gpt.choices[0].message.content
  });

  await supabase.from('consultations')
        .update({ status: 'review' })
        .eq('id', record.metadata.consultation_id);

  return { statusCode: 200 };
};