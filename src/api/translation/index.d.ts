export namespace Trans {
  interface TransParam {
    query: string;
    from: string;
    to: string;
  }
  interface TransResult {
    from: string;
    to: string;
    trans_result: Array<{ src: string; dst: string }>;
  }
  interface TransHistoryItem {
    content: string; //原文
    result: string; //译文
    fromLanguage: string; //源语言
    toLanguage: string; //目标语言
    createTime: string;
    userId: number;
  }
}
