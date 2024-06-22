import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  act,
  renderHook,
} from '@testing-library/react';

import { useSpeech } from '../lib/useSpeech';

describe("useSpeech Test Suite", () => {
  it("should return current sentence idx and current word range as well as playback state", () => {
    vi.stubGlobal('speechSynthesis', {
      onvoiceschanged: (e) => { },
      getVoices: () => {}
    });
    const sentences = ["This is a sentence.", "This is another sentence."];
    const { result } = renderHook(() => useSpeech(sentences));
    console.log({result})
    expect(result.current.currentSentenceIdx).toBe(0);
    expect(result.current.currentWordRange).toEqual([0, 0]);
    expect(result.current.playbackState).toBe("paused");
  });
});
