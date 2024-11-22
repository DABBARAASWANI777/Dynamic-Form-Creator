import { useEffect } from 'react';

export default function useDebouncedEffect(callback: () => void, delay: number, dependencies: any[]) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [...dependencies, delay]);
}