import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const onBoundary = (e: SpeechSynthesisEvent) => {};

  const onEnd = (e: SpeechSynthesisEvent) => {};
  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const {
    state,
    play: playSpeech,
    pause: pauseSpeech,
    load: loadSpeech,
    cancel,
  } = createSpeechEngine({ onBoundary, onEnd, onStateUpdate });

  const play = () => {
    console.log("play", sentences[currentSentenceIdx]);
    loadSpeech(sentences[currentSentenceIdx]);
    playSpeech();
    setCurrentSentenceIdx((v) => v + 1);
  };
  const pause = () => {
    console.log("pause");
    pauseSpeech();
  };
  const controls = { play, pause };

  useEffect(() => {
    console.log("playback: ", playbackState);
  }, [playbackState]);

  return {
    currentSentence: currentSentenceIdx,
    currentWord: currentWordRange,
    playbackState,
    controls,
  };
};

export { useSpeech };
