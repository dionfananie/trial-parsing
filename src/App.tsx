import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {  currentWordRange, currentSentenceIdx, playbackState, controls } =
    useSpeech(sentences);

  const fetching = useCallback(async () => {
    const text = await fetchContent();
    const parsedText = parseContentIntoSentences(text);
    setSentences(parsedText);
  }, [setSentences]);

  const loadNewContent = () => {
    fetching();
  };

  useEffect(() => {
    fetching();
  }, [fetching]);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          {...controls}
          state={playbackState}
          loadNewContent={loadNewContent}
        />
      </div>
    </div>
  );
}

export default App;
