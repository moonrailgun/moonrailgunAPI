import { useCallback } from 'react';

export function useTempAudio() {
  const play = useCallback((audioUrl: string) => {
    const el = document.createElement('audio');
    el.src = audioUrl;
    el.autoplay = true;
    el.onended = () => {
      el.remove();
    };
  }, []);

  return { play };
}
