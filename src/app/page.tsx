"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Muneco } from "./components/Muneco";
import { UserInput } from "./components/UserInput";
import { Countdown } from "./components/Countdown";
import { Fireworks } from "./components/Fireworks";
import { FallingWish } from "./components/FallingWish";
import { Floor } from "./components/Floor";
import { BurningSound } from "./components/BurningSound";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [wishes, setWishes] = useState<string[]>([]);
  const [isNewYear, setIsNewYear] = useState(false);
  const [newWish, setNewWish] = useState<string | null>(null);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const isNewYearTime =
        now.getMonth() === 11 &&
        now.getDate() === 31 &&
        now.getHours() === 23 &&
        now.getMinutes() === 59 &&
        now.getSeconds() === 59;
      if (isNewYearTime) {
        setIsNewYear(true);
      }
    };

    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const addWish = (wish: string) => {
    setWishes((prev) => [...prev, wish]);
    setNewWish(wish);
    setTimeout(() => setNewWish(null), 5000); // Remove falling effect after 5 seconds
  };

  const simulateNewYear = () => {
    setIsNewYear(true);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white">
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-2xl mb-2">Welcome 2025!</h1>
        <Countdown />
        <div className="mt-2">Wishes: {wishes.length}</div>
      </div>
      <div className="flex-grow relative">
        <Canvas camera={{ position: [-2, 3, 5], zoom: 3 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Muneco isNewYear={isNewYear} />
          <Floor />
          {/* Render all wishes as fallen papers */}
          {wishes.map((wish, index) => (
            <FallingWish
              key={index}
              wish={wish}
              position={[Math.random() * 4 - 2, 0.05, Math.random() * 4 - 2]}
            />
          ))}
          {isNewYear && <Fireworks />}
          {newWish && <FallingWish wish={newWish} />}
          <OrbitControls />
        </Canvas>
      </div>
      {!isNewYear && (
        <div className="z-50 p-4 flex justify-center items-center space-x-2">
          <UserInput onAddWish={addWish} />
          <Button onClick={simulateNewYear} variant="secondary">
            Simulate New Year (Test)
          </Button>
        </div>
      )}
      {isNewYear && <BurningSound />}
    </div>
  );
}
