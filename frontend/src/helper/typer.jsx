import { useState, useEffect } from "react";

// Cheksiz aylanish rejimiga ega maxsus Typewriter Hook
export function useTypewriter(wordsArray, speed = 100, deleteSpeed = 35, delayBetween = 1000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = wordsArray[currentWordIndex];
    let timer;

    if (!isDeleting) {
      // Harflarni bittalab yozish bo'limi
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
      }, speed);

      // So'z to'liq yozib bo'linganida
      if (displayedText === currentFullText) {
        timer = setTimeout(() => setIsDeleting(true), delayBetween);
      }
    } else {
      // Harflarni bittalab o'chirish bo'limi
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
      }, deleteSpeed);

      // So'z butunlay o'chirib bo'linganida
      if (displayedText === "") {
        setIsDeleting(false);
        // Keyingi so'zga o'tish (oxirgi so'zdan keyin yana birinchisiga qaytadi)
        setCurrentWordIndex((prev) => (prev + 1) % wordsArray.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, wordsArray, speed, deleteSpeed, delayBetween]);

  return { displayedText, currentWordIndex };
}