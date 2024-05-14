import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/ui/button/Button";

function App() {
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Function to start streaming from the user's webcam
    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }

    // Call the function to start the webcam stream
    startWebcam();

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // No dependencies so it runs only once on mount

  const handleRecordToggle = () => {
    if (!recording) {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
      };

      mediaRecorder.start();
      setRecording(true);
    } else {
      stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const handlePlayback = () => {
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    const recordedUrl = URL.createObjectURL(recordedBlob);
    const video = document.createElement("video");
    video.src = recordedUrl;
    video.controls = true;
    document.body.appendChild(video);
  };

  return (
    <div className="App">
      <h1 className="title">Live Stream</h1>
      <div className="stream-container">
        {stream && (
          <video className="video" srcobject={stream} autoPlay muted />
        )}
      </div>
      <Button
        variant={recording ? "destructive" : "outline"}
        onClick={handleRecordToggle}
      >
        {recording ? "Stop Recording" : "Record"}
      </Button>
      {recordedChunks.length > 0 && (
        <Button variant="outline" onClick={handlePlayback}>
          Playback
        </Button>
      )}
    </div>
  );
}

export default App;
