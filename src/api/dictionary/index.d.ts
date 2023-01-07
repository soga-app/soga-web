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
}
