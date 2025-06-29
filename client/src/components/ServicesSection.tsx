interface Service {
  title: string;
  description: string;
  details: string;
}

interface ServicesSectionProps {
  data?: Service[];
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const services = data || [
    {
      title: "University Application",
      description: "We guide students through applications to top international universities.",
      details: "Includes documentation review, application writing, visa support & interview coaching."
    },
    {
      title: "Scholarship Advisory",
      description: "Find and apply for available scholarships tailored to your goals.",
      details: "We assess eligibility, prepare you for success, and help with all paperwork."
    },
    {
      title: "Virtual Consultations",
      description: "Book sessions with our advisors to plan your academic journey.",
      details: "One-on-one sessions to explore university programs and career paths."
    }
  ];

  const getIcon = (index: number) => {
    const icons = [
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
      </svg>,
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>,
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
      </svg>
    ];
    return icons[index] || icons[0];
  };

  const getColorClass = (index: number) => {
    const colors = ['primary', 'secondary', 'accent'];
    return colors[index] || colors[0];
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our Services</h2>
          <p className="text-gray-600">At Mtendere Education Consult, we offer a wide range of services to help students achieve their educational goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className={`bg-${getColorClass(index)}/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <div className={`text-${getColorClass(index)}`}>
                  {getIcon(index)}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-sm text-gray-500">{service.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
