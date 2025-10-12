export function debounce(cb, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
