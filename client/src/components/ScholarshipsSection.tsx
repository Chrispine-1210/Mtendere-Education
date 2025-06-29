import { Button } from "@/components/ui/button";

interface Scholarship {
  title: string;
  program: string;
  rating: string;
  description: string;
  price: string;
}

interface ScholarshipsSectionProps {
  data?: Scholarship[];
}

export default function ScholarshipsSection({ data }: ScholarshipsSectionProps) {
  const scholarships = data || [
    {
      title: "MBBS – Full & Partial Scholarships",
      program: "5-Year MBBS",
      rating: "4.9",
      description: "Study Medicine in India, Russia, or Turkey. Scholarships cover up to 70% of tuition. Partnered with top medical universities with global licensure support.",
      price: "From $1,200/year"
    },
    {
      title: "Engineering Degrees – 50% Merit Scholarships",
      program: "4-Year BEng",
      rating: "4.7",
      description: "Join tech-focused campuses in Malaysia, UAE, or Poland. Scholarships based on academic excellence & motivation letters. Strong internship support.",
      price: "From $980/year"
    },
    {
      title: "Business & Management – Guaranteed Entry + Support",
      program: "3-Year BBA",
      rating: "4.8",
      description: "Affordable degrees in Canada & UK with pathway programs and 40% fee reductions. English support, visa training, and financial planning included.",
      price: "From $1,500/year"
    },
    {
      title: "IT & Computer Science – 30% Scholarships",
      program: "3-Year BSc",
      rating: "4.6",
      description: "Study in the UK, USA, or Australia with scholarships based on academic performance. Internship opportunities and career support included.",
      price: "From $1,200/year"
    }
  ];

  const getIcon = (index: number) => {
    const icons = [
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>,
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
      </svg>,
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>,
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
      </svg>
    ];
    return icons[index] || icons[0];
  };

  const getBackgroundColor = (index: number) => {
    const colors = [
      'from-red-100 to-red-200',
      'from-blue-100 to-blue-200',
      'from-green-100 to-green-200',
      'from-purple-100 to-purple-200'
    ];
    return colors[index] || colors[0];
  };

  const getIconColor = (index: number) => {
    const colors = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-purple-600'];
    return colors[index] || colors[0];
  };

  return (
    <section id="scholarships" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Top Scholarships</h2>
          <p className="text-gray-600">Discover the best scholarships available for students across India.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholarship, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-48 bg-gradient-to-br ${getBackgroundColor(index)} flex items-center justify-center`}>
                <div className={getIconColor(index)}>
                  {getIcon(index)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs">{scholarship.program}</span>
                  <div className="text-yellow-500 text-sm">★ {scholarship.rating}</div>
                </div>
                <h3 className="text-lg font-bold mb-2">{scholarship.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-secondary">{scholarship.price}</span>
                  <Button className="bg-accent text-white hover:bg-accent/90 text-sm">
                    Enroll now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-primary hover:text-primary/80 font-medium">
            View all programs 
            <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
