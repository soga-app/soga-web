import http from '@/api/config';
import { Dic } from './index.d';

export default {
  // 根据单词获取单词信息
  getWordCard: (word: string): Promise<Dic.WordInfo> => http.get('/api/word/wordCard', { word }),
  // 每日一词
  getDailyWord: (): Promise<Dic.WordInfo> => http.get('/api/word/daily'),
  // 根据输入匹配单词（词汇联想）
  getRelatedWord: (word: string): Promise<Array<Dic.WordRelated>> =>
    http.get('/api/word/search', { word })
};
