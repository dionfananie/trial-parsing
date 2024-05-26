import { PlayingState } from "../lib/speech";

const PLAY_STATE = "playing";
const PAUSED_STATE = "paused";
/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  const textDisplay = state === PLAY_STATE ? "Pause" : "Play";
  const handleClick = state === PLAY_STATE ? pause : play;
  return (
    <div>
      <button onClick={handleClick}>{textDisplay}</button>
      <button onClick={loadNewContent}>Load New Content</button>
    </div>
  );
};
