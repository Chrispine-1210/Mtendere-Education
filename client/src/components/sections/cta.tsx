import { Button } from "@/components/ui/button";
import { Rocket, Phone } from "lucide-react";

export default function CTA() {
  const handleStartApplication = () => {
    // Navigate to application form or login
    window.location.href = '/api/login';
  };

  const handleScheduleConsultation = () => {
    // Open WhatsApp or contact form
    window.open('https://wa.me/27111234567', '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-dark-text mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have achieved their international education dreams with our expert guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="btn-primary"
            onClick={handleStartApplication}
          >
            <Rocket className="mr-2 h-4 w-4" />
            Start Application
          </Button>
          <Button 
            variant="outline"
            className="btn-outline"
            onClick={handleScheduleConsultation}
          >
            <Phone className="mr-2 h-4 w-4" />
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
