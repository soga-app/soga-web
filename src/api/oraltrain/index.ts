import http from '@/api/config';
import { Oral } from './index.d';

export default {
  getChatgptResponse: (data: Oral.chatParam): Promise<string> =>
    http.post('/gpt/chatbot', data, { retryTimes: 3 }),
  textToAudio: (data: { text: string }): Promise<string> =>
    http.post('/api/XunFei/textTurnVoice', data),
  audio2Text: (formData: any): Promise<Oral.Audio2TextRes> =>
    http.post('/api/translate/get', formData)
};
