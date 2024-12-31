"use client";

import { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNewYear());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNewYear());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeUntilNewYear() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="text-center">
      <div className="text-xl mb-2">Time left for New Year</div>
      <div className="text-4xl font-mono bg-gray-800 p-4 rounded-lg">
        {String(timeLeft.days).padStart(2, "0")}:
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </div>
    </div>
  );
}
