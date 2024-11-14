"use client";
import { useEffect, useState } from "react";

export const useBrowserActivity = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleFocus = () => setIsActive(true);
    const handleBlur = () => setIsActive(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isActive;
};
