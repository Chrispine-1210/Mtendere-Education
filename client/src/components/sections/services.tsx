import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  FileText, 
  Award, 
  Tickets, 
  Calculator, 
  Users 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: GraduationCap,
      title: "University Selection",
      description: "Expert guidance to find the perfect university match based on your profile and goals.",
      color: "bg-primary"
    },
    {
      icon: FileText,
      title: "Application Support",
      description: "Complete assistance with application forms, essays, and document preparation.",
      color: "bg-accent"
    },
    {
      icon: Award,
      title: "Scholarship Guidance",
      description: "Help you discover and apply for scholarships and financial aid opportunities.",
      color: "bg-secondary"
    },
    {
      icon: Tickets,
      title: "Visa Assistance",
      description: "Step-by-step guidance through the visa application process.",
      color: "bg-primary"
    },
    {
      icon: Calculator,
      title: "Cost Calculator",
      description: "Estimate tuition fees, living costs, and total expenses for your studies.",
      color: "bg-accent"
    },
    {
      icon: Users,
      title: "1-on-1 Consultation",
      description: "Personalized counseling sessions with our education experts.",
      color: "bg-secondary"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-dark-text mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive support for your educational journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="text-center p-8 rounded-xl bg-neutral-bg card-hover border-0">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="text-white text-2xl h-8 w-8" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-dark-text mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
