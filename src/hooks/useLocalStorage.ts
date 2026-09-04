import { useCallback, useEffect, useState } from 'react';

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable */
  }
}

export function useLocalStorage<T>(
  key: string,
  fallback: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => readStored(key, fallback));

  useEffect(() => {
    writeStored(key, state);
  }, [key, state]);

  const update = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) =>
        typeof value === 'function'
          ? (value as (prev: T) => T)(prev)
          : value,
      );
    },
    [],
  );

  return [state, update];
}
