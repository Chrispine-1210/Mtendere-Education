import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface SiteData {
  hero: {
    slides: Array<{
      title: string;
      description: string;
    }>;
  };
  about: {
    title: string;
    description: string;
    vision: string;
    commitment: string;
  };
  services: Array<{
    title: string;
    description: string;
    details: string;
  }>;
  destinations: Array<{
    name: string;
    description: string;
  }>;
  scholarships: Array<{
    title: string;
    program: string;
    rating: string;
    description: string;
    price: string;
  }>;
  categories: Array<{
    name: string;
    courses: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
  }>;
  successStories: Array<{
    name: string;
    achievement: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    phone: string;
    email: string;
    hours: string;
  };
}

export function useSiteData() {
  return useQuery<SiteData>({
    queryKey: ["/api/site-data"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateSiteData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/update-site-data");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-data"] });
    },
  });
}
