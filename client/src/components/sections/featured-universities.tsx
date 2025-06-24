import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, ExternalLink } from "lucide-react";
import type { University } from "@shared/schema";

export default function FeaturedUniversities() {
  const { data: universities, isLoading } = useQuery({
    queryKey: ["/api/universities?limit=6"],
  });

  // Fallback universities for display when no data is available
  const fallbackUniversities = [
    {
      id: 1,
      name: "University of Toronto",
      location: "Toronto, Canada",
      country: "Canada",
      description: "Leading research university with excellent programs in engineering, business, and medicine.",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      ranking: 1,
    },
    {
      id: 2,
      name: "Oxford University",
      location: "Oxford, United Kingdom",
      country: "United Kingdom",
      description: "World's oldest English-speaking university with unparalleled academic excellence.",
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      ranking: 2,
    },
    {
      id: 3,
      name: "University of Melbourne",
      location: "Melbourne, Australia",
      country: "Australia",
      description: "Australia's leading university known for innovation and research excellence.",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      ranking: 3,
    }
  ];

  const displayUniversities = universities && universities.length > 0 ? universities.slice(0, 6) : fallbackUniversities;

  return (
    <section id="universities" className="py-16 bg-neutral-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-dark-text mb-4">
            Partner Universities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our network of world-renowned institutions
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded mb-3"></div>
                  <div className="h-12 bg-gray-200 animate-pulse rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayUniversities.map((university: University | any) => (
              <Card key={university.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img 
                  src={university.imageUrl || `https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`}
                  alt={`${university.name} campus`}
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-poppins font-semibold text-xl text-dark-text">
                      {university.name}
                    </h3>
                    {university.ranking && (
                      <Badge className="bg-accent text-white">
                        Rank #{university.ranking}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{university.location}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {university.description || "Excellent educational institution with diverse academic programs."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">
                      {university.programCount || "120+"}+ Programs
                    </span>
                    <Button variant="link" className="text-accent hover:text-accent-light font-medium p-0">
                      View Details <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button className="btn-primary">
            <Building2 className="mr-2 h-4 w-4" />
            View All Universities
          </Button>
        </div>
      </div>
    </section>
  );
}
