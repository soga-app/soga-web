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
}
