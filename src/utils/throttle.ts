export default function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): T {
  let lastCall = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  } as T;
}
