export namespace Community {
  interface CommunityColumn {
    id: number;
    catergory1: string;
    catergory2: string;
    catergory2Introduction: string;
    card: string;
  }
  interface GetPassageParam {
    catergory2: string;
    page: number;
    size: number;
  }
  interface PassageResult {
    communityContentList: {
      records: Array<PassageItem>;
      total: number;
      size: number;
      current: number;
      searchCount: boolean;
      pages: number;
    };
    card: string;
  }
  interface PassageItem {
    id: number;
    catergory2: string;
    passageTitle: string;
    passageContent: string;
    translate: string;
  }
}
