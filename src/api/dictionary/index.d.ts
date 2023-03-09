export namespace Dic {
  interface WordInfo {
    id: number;
    word: string;
    female?: string;
    male?: string;
    luomayin?: string;
    meaning?: string;
    pingJm?: Array<string>;
    pianJm?: Array<string>;
    sentence?: Array<Sentence>;
    jyc?: Array<string>;
    xjc?: Array<string>;
    isCollected?: Array<number>;
  }
  interface Sentence {
    Chinese: string;
    Japanese: string;
    num?: number;
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
    dictId: number;
    word: string;
    dictIndex: number;
    phone: string;
    voice: string;
    wordDto: WordInfo;
  }
  interface LearningRecordParam {
    dictId: number;
    learnTime: number;
    learned: number;
    reviewed: number;
  }
  interface PlanRecordItem {
    createTime: string;
    learnedNum: number;
    reviewedNum: number;
    learnTime: number;
  }
  interface PlanRecordCalendarItem {
    dayN: number;
    learnedNum: number;
    reviewedNum: number;
    learnTime: number;
  }
}
