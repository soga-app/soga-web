import http from '@/api/config';
import { Oral } from './index.d';

export default {
  getChatgptResponse: (data: Oral.chatParam): Promise<string> => http.post('/gpt/chatbot', data),
  textToAudio: (data: { text: string }): Promise<string> =>
    http.post('/api/XunFei/textTurnVoice', data)
};
