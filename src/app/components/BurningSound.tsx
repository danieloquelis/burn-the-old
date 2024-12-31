import { useEffect, useRef, useState } from "react";

export function BurningSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const response = await fetch("/assets/bonfire.mp3");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer =
          await audioContextRef.current.decodeAudioData(arrayBuffer);

        sourceRef.current = audioContextRef.current.createBufferSource();
        sourceRef.current.buffer = audioBuffer;
        sourceRef.current.loop = true;
        sourceRef.current.connect(audioContextRef.current.destination);
        sourceRef.current.start();
      } catch (err) {
        console.error("Error setting up audio:", err);
        setError(
          "Failed to load audio. Please check your internet connection and try again.",
        );
      }
    };

    setupAudio();

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return null;
}
