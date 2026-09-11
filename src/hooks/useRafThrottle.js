import { useCallback, useRef } from "react";

/**
 * rAF-throttled callback — har mousemove pe layout read (getBoundingClientRect)
 * karne se bachta hai; per frame max ek execution.
 */
export function useRafThrottle(callback) {
  const frameRef = useRef(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback((...args) => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      callbackRef.current(...args);
    });
  }, []);
}
