import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";

export default function Hero() {
  const scrollToSearch = () => {
    const element = document.querySelector("#university-search");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-poppins font-bold text-4xl lg:text-6xl leading-tight mb-6">
              Your Gateway to{" "}
              <span className="text-secondary">Global Education</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 font-roboto leading-relaxed">
              Africa's premier education consultancy helping students access world-class universities and scholarships. Start your international education journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-secondary"
                onClick={scrollToSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Find Universities
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-colors font-poppins"
                onClick={scrollToContact}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Consultation
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-400">
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-secondary">500+</div>
                <div className="text-sm text-gray-300">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-secondary">10K+</div>
                <div className="text-sm text-gray-300">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-secondary">$50M+</div>
                <div className="text-sm text-gray-300">Scholarships Secured</div>
              </div>
            </div>
          </div>
          
          <div className="lg:ml-8">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Diverse group of students celebrating graduation" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
