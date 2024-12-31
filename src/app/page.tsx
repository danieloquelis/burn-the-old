"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Muneco } from "./components/Muneco";
import { UserInput } from "./components/UserInput";
import { Countdown } from "./components/Countdown";
import { Fireworks } from "./components/Fireworks";
import { FallingWish } from "./components/FallingWish";
import { Floor } from "./components/Floor";
import { BurningSound } from "./components/BurningSound";
import { Button } from "@/components/ui/button";
import { Wish } from "@prisma/client";

export default function Home() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isNewYear, setIsNewYear] = useState(false);
  const [newWish, setNewWish] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // For spinner/loader

  /**
   * 1) Load wishes from DB on initial load
   */
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        // Start loading
        setIsLoading(true);

        // Fetch the existing wishes from your API route /wishes (GET)
        const response = await fetch("/api/get-wish");
        if (!response.ok) {
          throw new Error("Error fetching wishes");
        }
        const data = await response.json();
        // data should be an array of objects like: [{ id, uuid, description }, ...]
        setWishes(data);
      } catch (error) {
        console.error("Failed to fetch wishes:", error);
      } finally {
        // Stop loading
        setIsLoading(false);
      }
    };

    fetchWishes();
  }, []);

  /**
   * 2) Example checkTime that sets isNewYear at 00:00:00, Jan 1, 2025 onward
   */
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const newYear2025 = new Date(2025, 0, 1, 0, 0, 0); // 2025-01-01 00:00:00
      if (now >= newYear2025) {
        setIsNewYear(true);
      }
    };

    // Check immediately
    checkTime();
    // Then check every second
    const timer = setInterval(checkTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /**
   * 3) addWish: call /wish (POST) to add a new wish to DB
   */
  const addWish = async (wishText: string) => {
    try {
      // Optionally show loader while posting
      setIsLoading(true);

      // Call your serverless function: /wish
      const response = await fetch("/api/add-wish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: wishText }),
      });

      if (!response.ok) {
        throw new Error("Failed to add wish");
      }

      // The API response should be the newly created Wish object
      const createdWish = await response.json();

      // Put newly added wish in local state
      setWishes((prev) => [...prev, createdWish]);

      // Also trigger the falling effect
      setNewWish(createdWish.description);
      setTimeout(() => setNewWish(null), 5000);
    } catch (error) {
      console.error("Error adding wish:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 4) Simulate new year button
   */
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

      {/* 7) If not new year, show input and Simulate button */}
      {!isNewYear && (
        <div className="z-50 p-4 flex justify-center items-center space-x-2">
          <UserInput onAddWish={addWish} />
        </div>
      )}

      {/* 5) Show a spinner (or any loader) while fetching data */}
      {isLoading && (
        <div className="flex justify-center items-center z-50 p-4">
          <div className="loader" />
          {/* Or, for a simple spinner:
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          */}
          <span className="ml-2">Loading...</span>
        </div>
      )}

      <div className="flex-grow relative">
        <Canvas camera={{ position: [-2, 3, 5], zoom: 3 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Muneco isNewYear={isNewYear} />
          <Floor />

          {/* 6) Render all wishes from DB as fallen papers. 
              'description' is the main property we need to show. */}
          {wishes.map((wish) => (
            <FallingWish
              key={wish.id} // or wish.uuid if you prefer
              wish={wish.description}
              position={[Math.random() * 4 - 2, 0.05, Math.random() * 4 - 2]}
            />
          ))}

          {/* Fireworks only show if it's new year */}
          {isNewYear && <Fireworks />}

          {/* The single 'falling' effect for newly added wish */}
          {newWish && <FallingWish wish={newWish} />}

          <OrbitControls />
        </Canvas>
      </div>

      {/* If isNewYear, play the burning sound */}
      {isNewYear && <BurningSound />}
    </div>
  );
}
