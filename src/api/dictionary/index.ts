import http from '@/api/config';
import { Dic } from './index.d';

export default {
  // 根据单词获取单词信息
  getWordCard: (word: string): Promise<Dic.WordInfo> => http.get('/api/word/wordCard', { word }),
  // 每日一词
  getDailyWord: (): Promise<Dic.WordInfo> => http.get('/api/word/daily'),
  // 根据输入匹配单词（词汇联想）
  getRelatedWord: (word: string): Promise<Array<Dic.WordRelated>> =>
    http.get('/api/word/search', { word }),
  //  查询词典列表
  getDictionary: (): Promise<Array<Dic.Dictionary>> => http.get('/api/dictionary/dictList'),
  // 创建学习计划
  addPlan: (data: Dic.AddPlanParam) => http.post('/api/plan/insert', data),
  // 更改学习计划
  updatePlan: (data: { planId: number }): Promise<void> => http.put('/api/plan/update', data),
  // 获取当前用户学习计划
  getCurPlan: (): Promise<Array<Dic.Plan>> => http.get('/api/plan/planList'),
  // 今日背词目标
  getTodayWordGoal: (): Promise<Dic.TodayWordGoal> => http.get('/api/PlanRecord'),
  // 今日背单词列表
  getTodayWordList: (): Promise<Dic.TodayWordList> => http.get('/api/plan/wordList'),
  // 更新用户单词记录
  updateLearningRecord: (data: Dic.LearningRecordParam) => http.put('/api/PlanRecord', data)
};
