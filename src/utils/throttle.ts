export function throttle(func: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, ...args: any[]) {
    //必需等到上一个定时器执行完成后timer才会被释放，期间即使在设定的时间间隔内再次触发了事件，也无法触发新的定时器
    if (!timer) {
      //当事件触发时，设置一个定时器，在设定的时间间隔后执行处理函数
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
