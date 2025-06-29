import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroData {
  slides: Array<{
    title: string;
    description: string;
  }>;
}

interface HeroSectionProps {
  data?: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = data?.slides || [
    {
      title: "Welcome to Mtendere Education Consult",
      description: "Our mission is to provide you with the best opportunities to study abroad."
    },
    {
      title: "Scholarships Available",
      description: "Our scholarships are designed to help you achieve your educational goals."
    },
    {
      title: "International Experiences",
      description: "Our international experiences are designed to help you achieve your educational goals."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20">
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide absolute inset-0 ${
                index === currentSlide ? 'active' : ''
              }`}
            >
              <div className={`absolute inset-0 ${
                index === 0 
                  ? 'bg-gradient-to-r from-primary/90 to-primary/70' 
                  : index === 1 
                  ? 'bg-gradient-to-r from-secondary/90 to-secondary/70'
                  : 'bg-gradient-to-r from-accent/90 to-accent/70'
              }`}></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8">
                      {slide.description}
                    </p>
                    {index === 0 && (
                      <Button className="bg-accent text-white px-8 py-3 text-lg hover:bg-accent/90">
                        Start Your Journey
                      </Button>
                    )}
                    {index === 1 && (
                      <Button 
                        onClick={() => scrollToSection('scholarships')}
                        className="bg-white text-secondary px-8 py-3 text-lg hover:bg-gray-100"
                      >
                        View Scholarships
                      </Button>
                    )}
                    {index === 2 && (
                      <Button 
                        onClick={() => scrollToSection('destinations')}
                        className="bg-white text-accent px-8 py-3 text-lg hover:bg-gray-100"
                      >
                        Explore Destinations
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
