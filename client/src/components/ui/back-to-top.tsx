import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`floating-element back-to-top bg-accent text-accent-foreground w-12 h-12 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center ${
        isVisible ? "visible" : ""
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
