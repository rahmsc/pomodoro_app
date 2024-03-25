"use client";

import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      interval.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval.current as number);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [running]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const timerTime = formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#d1403f] text-white rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="text-6xl font-semibold mb-4">{timerTime}</div>
      <div className="flex flex-row space-x-3">
        <button
          type="button"
          onClick={() => setRunning(!running)}
          className="bg-white text-[#d1403f] px-8 py-2 rounded-full focus:outline-none"
        >
          {running === true ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setTimeLeft(25 * 60); // Reset the timer to 25 minutes
          }}
          className="bg-white text-[#d1403f] px-8 py-2 rounded-full focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
