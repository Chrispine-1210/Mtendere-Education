import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UniversitySearch() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState({
    level: "",
    field: "",
    country: ""
  });

  const handleSearch = () => {
    if (!searchParams.level || !searchParams.field || !searchParams.country) {
      toast({
        title: "Search Parameters Required",
        description: "Please select all search criteria to find relevant programs.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Search Started",
      description: "Searching for programs that match your criteria...",
    });
    
    // Here you would typically navigate to search results or trigger a search
    console.log("Search params:", searchParams);
  };

  return (
    <section id="university-search" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-dark-text mb-4">
            Find Your Perfect Program
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Search through our extensive database of universities and programs worldwide
          </p>
        </div>
        
        <div className="bg-neutral-bg rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Study Level
              </label>
              <Select value={searchParams.level} onValueChange={(value) => setSearchParams({...searchParams, level: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Field of Study
              </label>
              <Select value={searchParams.field} onValueChange={(value) => setSearchParams({...searchParams, field: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="arts-humanities">Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Destination
              </label>
              <Select value={searchParams.country} onValueChange={(value) => setSearchParams({...searchParams, country: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                className="w-full btn-primary"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Programs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
