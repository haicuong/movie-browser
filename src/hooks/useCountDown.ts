import { useEffect, useState } from "react";

export default function useCountDown(initialValue: number) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const resetCount = () => setCount(initialValue);

  return [count, resetCount] as const;
}
