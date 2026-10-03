import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
  const [stateValue, setStateValue] = useState(value);

  function immediateUpdate(newValue: T) {
    setStateValue(newValue);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStateValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [stateValue, immediateUpdate] as const;
}
