import { useEffect, useRef } from 'react';

// Calls onSpace when Space is pressed (not held down). If a button or form field has focus, the browser's own
// Space handling wins instead (e.g. after clicking ▼ it stays focused and Space "clicks" it), so one press = one step.
export function useSpaceKey(onSpace, enabled = true) {
  const callback = useRef(onSpace);
  useEffect(() => { callback.current = onSpace; });

  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e) => {
      if ((e.key !== ' ' && e.code !== 'Space') || e.repeat) return;
      if (e.target instanceof Element && e.target.closest('button, input, select, textarea, a')) return;
      e.preventDefault();
      callback.current?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
}
