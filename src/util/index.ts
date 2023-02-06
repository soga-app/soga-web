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
  let f = parseFloat(x);
  if (isNaN(f)) {
    return 0;
  }
  f = Math.round(x * 100) / 100;
  return f;
};
