import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  
  let sentenceQueue = []
  const {state,
    cancel,
    load, play: playSpeech } = createSpeechEngine({
      onBoundary: (e) => { 
        console.log({ charIndex: e.charIndex, charLength: e.charLength})
        if (e.name === 'word') {
          setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
        }
      },
      onEnd: (e) => {
        if (sentenceQueue.length) {
          console.log(currentWordRange, currentSentenceIdx, sentences, sentenceQueue)
          const sentence = sentenceQueue.shift();
          load(sentence);
          playSpeech();
          setCurrentSentenceIdx(sentences.length - sentenceQueue.length - 1);
        }
      },
      onStateUpdate: (e) => {
        console.log('update', e)
        console.log(e)
      },
    })
  

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  useEffect(() => {
    sentenceQueue = sentences.slice();
  }, [sentences])

  

  const play = () => {
    const sentence = sentenceQueue.shift();
    load(sentence);
    playSpeech();
  }
  
  const pause = () => {
    setPlaybackState('ended')
  };
  
  
  
  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    setPlaybackState,
    play,
    pause,
    controls: {
      play: () => play(),
      pause: () => pause(),
      state: playbackState
    }
  };
};

export { useSpeech };