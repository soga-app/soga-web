import http from '@/api/config';
import { Dic } from './index.d';

export default {
  getWordCard: (wordId: number): Promise<Dic.WordInfo> =>
    http.post('/api/word/wordCard', {}, { params: { wordId } })
};
