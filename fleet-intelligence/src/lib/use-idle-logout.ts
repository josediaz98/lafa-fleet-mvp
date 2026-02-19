import { useEffect, useRef, useCallback } from 'react';

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 min

export function useIdleLogout(onLogout: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const stableLogout = useCallback(() => onLogout(), [onLogout]);

  useEffect(() => {
    function resetTimer() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(stableLogout, IDLE_TIMEOUT);
    }
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((e) =>
      window.addEventListener(e, resetTimer, { passive: true }),
    );
    resetTimer();
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [stableLogout]);
}
