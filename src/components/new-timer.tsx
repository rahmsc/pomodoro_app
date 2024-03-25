"use client";

import { useState, useEffect, useRef } from "react";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

const modeDurations = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const TimerCard = () => {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(modeDurations.pomodoro);
  const [running, setRunning] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setRunning(false);
    }
  }, [timeLeft]);

  const switchMode = (newMode: Mode) => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setMode(newMode);
    setTimeLeft(modeDurations[newMode]);
    setRunning(false);
  };

  const formatTime = (time: number): string => {
    const minutes: string = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds: string = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const tabStyle = (tabMode: Mode) =>
    `w-full text-center py-2 rounded-t-lg cursor-pointer ${
      mode === tabMode ? "bg-white text-black" : "bg-black text-white"
    }`;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg max-w-sm mx-auto bg-black text-white">
      <div className="w-full flex mb-4">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={tabStyle("pomodoro")}
          onClick={() => switchMode("pomodoro")}
        >
          Pomodoro
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={tabStyle("shortBreak")}
          onClick={() => switchMode("shortBreak")}
        >
          Short Break
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={tabStyle("longBreak")}
          onClick={() => switchMode("longBreak")}
        >
          Long Break
        </div>
      </div>
      <div className="text-6xl font-semibold mb-4">{formatTime(timeLeft)}</div>
      <button
        type="button"
        onClick={() => setRunning(!running)}
        className="bg-white text-black px-8 py-2 rounded-full focus:outline-none"
      >
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default TimerCard;
