"use client";

import { useState } from "react";

interface CardProp {
  time: number | string;
}
const TimerCard = ({ time }: CardProp) => {
  const [running, setRunning] = useState(false);

  function handleStart() {
    setRunning(!running);
  }
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#d1403f] text-white rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="text-6xl font-semibold mb-4">{time}</div>
      <button
        type="button"
        className="bg-white text-[#d1403f] px-8 py-2 rounded-full focus:outline-none"
      >
        {running === true ? "Pause" : "Start"}
      </button>
      <div className="text-sm my-4">#5 Time to focus!</div>
    </div>
  );
};

export default TimerCard;
