import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(-1);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  const sentencesSpeech = sentences.join("\n");

  const onBoundary = (e: SpeechSynthesisEvent) => {
    if (e.name === "sentence") {
      setCurrentSentenceIdx((v) => v + 1);
    } else {
      setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
    }
  };
  const onEnd = (e: SpeechSynthesisEvent) => {};
  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const {
    play: playSpeech,
    pause: pauseSpeech,
    load,
  } = createSpeechEngine({
    onBoundary,
    onEnd,
    onStateUpdate,
  });

  const play = () => {
    load(sentencesSpeech);
    playSpeech();
  };

  const pause = () => {
    pauseSpeech();
  };

  const controls = { play, pause, state: playbackState };

  return {
    currentSentence: currentSentenceIdx,
    currentWord: currentWordRange,
    playbackState,
    controls,
  };
};

export { useSpeech };
