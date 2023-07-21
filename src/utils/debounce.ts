export function debounce(func: (...args: any[]) => any, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, ...args: any[]) {
    clearTimeout(timer as NodeJS.Timeout);

    timer = setTimeout(() => {
      return func.apply(this, args);
    }, delay);
  };
}
