// 节流函数
export const throttle = (func: Function, wait = 300) => {
  let timer: any = null;
  return function (...args: any) {
    if (!timer) {
      // 这个判断的意思就是如果当前没有定时器任务则可以让用户触发事件生成定时器任务
      timer = setTimeout(() => {
        // 只有当当前定时器任务执行完，将timer设置为null时,用户触发的事件才会再一次生成定时器任务
        timer = null;
        func(args);
      }, wait);
    }
  };
};

// 将浮点数四舍五入，取小数点后2位
export const toDecimal = (x: number): number => {
  let f = parseFloat(x + '');
  if (isNaN(f)) {
    return 0;
  }
  f = Math.round(x * 100) / 100;
  return f;
};

// 判断单词是中文还是日文，是中文返回1，日文返回2，啥都不是返回-1
export const isChinese = (word: string) => {
  // 判断是否包含汉字的正则表达式
  const chineseReg = new RegExp('[\u4e00-\u9fa5]');
  // 判断是否包含日文字符的正则表达式
  const japaneseReg = new RegExp(
    '[\u0800-\u4e00\u007c\u2026-\u2026\u3002-\u3003\u3005\u3006-\u3007\u303b-\u303c]'
  );
  //  将单词赋值给 word
  if (chineseReg.test(word)) {
    console.log('该单词为中文');
    return 1;
  } else if (japaneseReg.test(word)) {
    console.log('该单词为日文');
    return 2;
  } else {
    console.log('该单词不是中文也不是日文');
    return -1;
  }
};
