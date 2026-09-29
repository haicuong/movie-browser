import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [stateValue, setStateValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStateValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return stateValue;
}

export function useCountDown(initialValue: number) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const resetCount = () => setCount(initialValue);

  return [count, resetCount] as const;
}
