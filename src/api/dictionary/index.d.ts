export namespace Dic {
  interface WordInfo {
    id: string;
    word: string;
    female: string;
    male: string;
    luomayin: string;
    meaning: Array<string>;
    pingJm: Array<string>;
    pianJm: Array<string>;
    setentce: Array<Sentence>;
    jyc: Array<string>;
    xjc: Array<string>;
  }
  interface Sentence {
    Chinese: string;
    Japanese: string;
  }
}
