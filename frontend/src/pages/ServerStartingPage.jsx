import "./ServerStartingPage.css";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ServerStartingPage({ onServerReady }) {
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/health`);

        onServerReady();
      } catch {}
    };

    checkServer();

    const interval = setInterval(checkServer, 3000);

    return () => clearInterval(interval);
  }, [onServerReady]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="server-loading">
      <div className="spinner"></div>
      <h1>Starting Server</h1>

      {secondsLeft > 0 ? (
        <>
          <p>This app is hosted on Render's free tier.</p>
          <p>The server may take around a minute to wake up.</p>
          <h2>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </h2>
        </>
      ) : (
        <>
          <h2>Almost Ready...</h2>
          <p>The server is taking a little longer than expected.</p>
          <p>Please keep this page open. We'll redirect you automatically.</p>
        </>
      )}
    </div>
  );
}
