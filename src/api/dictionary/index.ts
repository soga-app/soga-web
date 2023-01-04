import http from '@/api/config';
import { Dic } from './index.d';

export default {
  getWordCard: (wordId: string): Promise<Dic.WordInfo> => http.post('api/word/wordCard', { wordId })
};
