import http from '@/api/config';
import { Oral } from './index.d';

export default {
  getChatgptResponse: (data: Oral.chatParam): Promise<string> => http.post('/gpt/chatbot', data)
};
