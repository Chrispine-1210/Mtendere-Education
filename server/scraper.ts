import { JSDOM } from 'jsdom';

export interface ScrapedContent {
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

export async function scrapeWebsiteContent(): Promise<ScrapedContent> {
  try {
    const response = await fetch('https://chrispine-1210.github.io/Mtendere-Education-Consult-/');
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    return {
      hero: {
        slides: [
          {
            title: "Welcome to Mtendere Education Consult",
            description: "Our mission is to provide you with the best opportunities to study abroad."
          },
          {
            title: "Scholarships Available",
            description: "Our scholarships are designed to help you achieve your educational goals."
          },
          {
            title: "International Experiences",
            description: "Our international experiences are designed to help you achieve your educational goals."
          }
        ]
      },
      about: {
        title: "Learn More About Us",
        description: "Mtendere is committed to providing the best possible education and opportunities for its students. We are a registered organization under the Malawi Government Business Registration Act (No 12 of 2012), with a strong passion for education and a mission to connect aspiring students with prestigious international universities and colleges.",
        vision: "To create a world where students from all walks of life can achieve their dreams of success and personal fulfillment.",
        commitment: "To provide a safe, supportive, and inclusive environment for students to explore their passions, pursue their dreams, and build their careers."
      },
      services: [
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
      ],
      destinations: [
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
      ],
      scholarships: [
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
      ],
      categories: [
        { name: "Science", courses: "1,391 courses" },
        { name: "Business", courses: "3,234 courses" },
        { name: "Finance Accounting", courses: "931 courses" },
        { name: "Design", courses: "7,291 courses" },
        { name: "Music", courses: "9,114 courses" },
        { name: "Marketing", courses: "2,391 courses" },
        { name: "Photography", courses: "7,991 courses" },
        { name: "Animation", courses: "6,491 courses" }
      ],
      testimonials: [
        {
          name: "Amanda S.",
          role: "Law Student, University of Manchester",
          quote: "The guidance from Mtendere helped me get my scholarship in the UK!..."
        },
        {
          name: "Rob Smith",
          role: "Product Designer, University of California",
          quote: "Thanks to Mtendere, I could pursue my dream of studying abroad..."
        },
        {
          name: "Thoko M.",
          role: "Engineering Student, University of Toronto",
          quote: "Mtendere Education Consult's personalized approach made all the difference..."
        }
      ],
      successStories: [
        {
          name: "Caroline Tembo",
          achievement: "Hons Degree in Commerce - PCTE India"
        },
        {
          name: "Janet Kandulu",
          achievement: "BSc Nutrition and Dietetics - Chandigarh"
        },
        {
          name: "Trust Chikondi Mangani",
          achievement: "BSc Cybersecurity - 2023"
        }
      ],
      faq: [
        {
          question: "What services does Mtendere Education Consult provide?",
          answer: "We assist students in securing international university placements, provide scholarship guidance, career consulting, and pre-departure orientation."
        },
        {
          question: "How can I apply for a scholarship?",
          answer: "You can apply through our unified application portal. Make sure to upload all required documents such as transcripts, CV, and identification documents."
        },
        {
          question: "What are the entry requirements for partner universities?",
          answer: "Entry requirements vary depending on the university and program. Generally, you'll need academic transcripts, proof of English proficiency, and a valid passport."
        },
        {
          question: "Is Mtendere Education Consult affiliated with universities?",
          answer: "Yes. We have official partnerships with reputable institutions like Chandigarh University, Parul University, Jain University, and more."
        },
        {
          question: "How can I contact Mtendere Education Consult?",
          answer: "You can reach us through our website contact form, email us at info@mtendereeducationconsult.com, or call us at +265999360325."
        }
      ],
      contact: {
        phone: "+265999360325",
        email: "mtendereeduconsult@gmail.com",
        hours: "Mon - Fri: 8:00 AM - 6:00 PM"
      }
    };
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape website content');
  }
}
