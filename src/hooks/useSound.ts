import { useCallback, useRef } from 'react';

const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  magic: 'https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
} as const;

export type SoundType = keyof typeof SOUNDS;

export const useSound = () => {
  const audioRefs = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({});

  const playSound = useCallback((type: SoundType, volume = 0.4) => {
    const isMuted = localStorage.getItem('app-muted') === 'true';
    if (isMuted) return;

    try {
      if (!audioRefs.current[type]) {
        audioRefs.current[type] = new Audio(SOUNDS[type]);
      }
      
      const audio = audioRefs.current[type]!;
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore errors from browsers blocking audio
      });
    } catch (e) {
      console.warn('Audio playback failed', e);
    }
  }, []);

  return { playSound };
};
