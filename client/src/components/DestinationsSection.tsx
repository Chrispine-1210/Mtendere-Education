interface Destination {
  name: string;
  description: string;
}

interface DestinationsSectionProps {
  data?: Destination[];
}

export default function DestinationsSection({ data }: DestinationsSectionProps) {
  const destinations = data || [
    {
      name: "United Kingdom",
      description: "We have a network of top international universities and colleges in the UK. Visit our directory to find the perfect university for your needs."
    },
    {
      name: "France",
      description: "We have a network of top international universities and colleges in France. Visit our directory to find the perfect university for your needs."
    },
    {
      name: "Germany",
      description: "We have a network of top international universities and colleges in Germany. Visit our directory to find the perfect university for your needs."
    },
    {
      name: "Canada",
      description: "We have a network of top international universities and colleges in Canada. Visit our directory to find the perfect university for your needs."
    }
  ];

  const getFlag = (name: string) => {
    const flags = {
      "United Kingdom": "🇬🇧",
      "France": "🇫🇷",
      "Germany": "🇩🇪",
      "Canada": "🇨🇦"
    };
    return flags[name as keyof typeof flags] || "🌍";
  };

  const getFlagColors = (name: string) => {
    const colors = {
      "United Kingdom": "from-blue-600 to-red-600",
      "France": "from-blue-600 via-white to-red-600",
      "Germany": "from-black via-red-600 to-yellow-400",
      "Canada": "from-red-600 to-white"
    };
    return colors[name as keyof typeof colors] || "from-blue-500 to-green-500";
  };

  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our Destinations</h2>
          <p className="text-gray-600">Mtendere Education Consult is committed to providing students with the best possible study environment and support.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-48 bg-gradient-to-br ${getFlagColors(destination.name)} flex items-center justify-center`}>
                <span className="text-6xl">{getFlag(destination.name)}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Learn More 
                  <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
