import { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsSectionProps {
  data?: Testimonial[];
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = data || [
    {
      name: "Amanda S.",
      role: "Law Student, University of Manchester",
      quote: "The guidance from Mtendere helped me get my scholarship in the UK!..."
    },
    {
      name: "Rob Smith",
      role: "Product Designer, University of California",
      quote: "Thanks to Mtendere, I could pursue my dream of studying abroad..."
    },
    {
      name: "Thoko M.",
      role: "Engineering Student, University of Toronto",
      quote: "Mtendere Education Consult's personalized approach made all the difference..."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say?</h2>
          <p className="text-gray-600">Our students have come to rely on us for their international education needs.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide bg-white p-8 rounded-lg shadow-lg text-center ${
                  index === currentTestimonial ? 'active' : ''
                }`}
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
