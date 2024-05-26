import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, controls } = useSpeech(sentences);

  const fetching = useCallback(async () => {
    const response = await fetchContent();
    const respText = parseContentIntoSentences(response);

    setSentences(respText);
  }, [setSentences]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentSentenceIdx={currentSentence}
          currentWordRange={currentWord}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls {...controls} loadNewContent={fetching} />
      </div>
    </div>
  );
}

export default App;
