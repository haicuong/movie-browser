import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
  const [stateValue, setStateValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function immediateUpdate(newValue: T) {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setStateValue(newValue);
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setStateValue(value);
      timerRef.current = null;
    }, delay);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, delay]);

  return [stateValue, immediateUpdate] as const;
}
