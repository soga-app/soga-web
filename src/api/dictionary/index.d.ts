export namespace Dic {
  interface WordInfo {
    id: string;
    word: string;
    female: string;
    male: string;
    luomayin: string;
    meaning: string;
    pingJm: Array<string>;
    pianJm: Array<string>;
    sentence: Array<Sentence> | null;
    jyc: Array<string> | null;
    xjc: Array<string> | null;
  }
  interface Sentence {
    Chinese: string;
    Japanese: string;
  }
  interface WordRelated {
    word: string;
    wordId: string;
    meaning?: string;
  }
  interface AddPlanParam {
    dictId: number;
    timeSpan: number;
  }
  interface Dictionary {
    count: number;
    createTime: string;
    dictType: string;
    id: number;
    name: string;
    summary: string;
  }
  interface Plan {
    count: number;
    createTime: string;
    dictId: number;
    endTime: string;
    finish: number;
    goal: number;
    id: number;
    name: string;
    timeSpan: number;
    updateTime: string;
    userId: string;
  }
  interface TodayWordGoal {
    plan: Plan;
    recordId: number;
    learnedNum: number;
    learningNum: number;
    reviewingNum: number;
    restNum: number;
    createTime: string;
  }
  interface TodayWordList {
    learn: Array<LearnCardInfo>;
    review: Array<LearnCardInfo>;
  }
  interface LearnCardInfo {
    dictId: string;
    word: string;
    dictIndex: number;
    phone: string;
    voice: string;
    wordDto: WordInfo;
  }
}
