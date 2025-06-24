import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Amara Okafor",
      university: "MIT, Computer Science",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      testimonial: "Mtendere Education made my dream of studying at MIT a reality. Their guidance was invaluable throughout the entire process.",
      rating: 5
    },
    {
      name: "Kwame Asante",
      university: "Oxford University, Business",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      testimonial: "The scholarship guidance helped me secure a full scholarship to Oxford. I couldn't have done it without their expert support.",
      rating: 5
    },
    {
      name: "Fatima Kone",
      university: "University of Toronto, Medicine",
      image: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      testimonial: "Professional, thorough, and genuinely care about your success. They made the complex application process so much easier.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Hear from students who achieved their dreams with our help
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-xl p-8 card-hover border-0">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image}
                    alt={`${testimonial.name} testimonial`}
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-poppins font-semibold text-dark-text">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.university}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex text-secondary">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
