export namespace Collection {
  interface CollectionItem {
    id: number;
    userId: number;
    name: string;
    creatTime: string;
  }
  interface CollectionContent {
    id: number;
    wordId: number;
    sentenceNum: number;
    sentence: string;
    mean: string;
    creatTime: string;
    type?: string;
  }
  interface CollectContentParam {
    colId: number;
    sentenceNum: number;
    wordId: number;
    type: string;
  }
}
