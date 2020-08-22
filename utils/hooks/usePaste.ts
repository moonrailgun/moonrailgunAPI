import { useEffect } from 'react';

export function usePaste(onPaste: (e: ClipboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('paste', onPaste);

    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, [onPaste]);
}
