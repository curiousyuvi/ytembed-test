import React, { useEffect, useState } from "react";
import "./App.css";
import YouTube from "react-youtube";

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState(10);
  const [progress, setProgress] = useState(3);

  const handleStateChange = (event) => {
    switch (event.data) {
      case 1: {
        setPlaying(true);
        console.log("set playing called");
        break;
      }
      default:
        setPlaying(false);
    }
  };

  const handleNativePause = () => {};
  const handleNativePlay = () => {};

  const handlePlayPause = () => {
    if (player) {
      if (playing) player.pauseVideo();
      else player.playVideo();
      setProgress(player.getCurrentTime());
    }
  };
  const _onReady = (event) => {
    setPlayer(event.target);
    event.target.pauseVideo();
    setDuration(event.target.getDuration());
    setProgress(event.target.getCurrentTime());
  };
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      enablejsapi: 1,
      autoplay: 1,
      playsinline: true,
    },
  };
  return (
    <div>
      <YouTube
        videoId="5IG4UmULyoA"
        opts={opts}
        onReady={_onReady}
        onStateChange={handleStateChange}
      />
      <div
        style={{
          width: "25rem",
          height: "5px",
          backgroundColor: "black",
          display: "flex",
          justifyItems: "start",
        }}
      >
        <div
          style={{
            width: `${(progress / duration) * 100}%`,
            height: "100%",
            backgroundColor: "red",
          }}
        />
      </div>
      <button onClick={handlePlayPause}>{playing ? "pause" : "play"}</button>
    </div>
  );
};

export default App;
