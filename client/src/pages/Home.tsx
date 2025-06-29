import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DestinationsSection from "@/components/DestinationsSection";
import ScholarshipsSection from "@/components/ScholarshipsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useSiteData, useUpdateSiteData } from "@/hooks/use-site-data";

export default function Home() {
  const { data: siteData, isLoading } = useSiteData();
  const updateSiteData = useUpdateSiteData();
  const hasTriedUpdate = useRef(false);

  useEffect(() => {
    // Update site data on initial load if not present
    if (!siteData && !isLoading && !hasTriedUpdate.current) {
      hasTriedUpdate.current = true;
      updateSiteData.mutate();
    }
  }, [siteData, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-pulse text-lg">Loading educational content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection data={siteData?.hero} />
      
      {/* Video Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Video Showcase</h2>
          <p className="text-gray-600 mb-8">Watch our video showcase to get a better understanding of our mission.</p>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <button className="bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors">
                <svg className="w-6 h-6 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{siteData?.about?.title || "Learn More About Us"}</h2>
              <p className="text-gray-700 mb-6">
                {siteData?.about?.description || "Loading content..."}
              </p>
            </div>
            <div>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Commitment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision & Commitment</h2>
            <p className="text-gray-600">To provide the best possible education and opportunities for our students, we strive to:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
              <p className="text-gray-700">
                {siteData?.about?.vision || "Loading vision..."}
              </p>
            </div>
            <div className="bg-secondary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-secondary mb-4">Commitment</h3>
              <p className="text-gray-700">
                {siteData?.about?.commitment || "Loading commitment..."}
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Strong Partnerships</h4>
              <p className="text-sm text-gray-600">With top global universities and colleges</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Expert Advice</h4>
              <p className="text-sm text-gray-600">From experienced professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Integrity</h4>
              <p className="text-sm text-gray-600">Transparency and professionalism</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Clear Information</h4>
              <p className="text-sm text-gray-600">Up-to-date for students and families</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🌍</span>
                <span className="text-gray-700">Integrity in service</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📚</span>
                <span className="text-gray-700">Educational excellence</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🤝</span>
                <span className="text-gray-700">Personalized support</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🚀</span>
                <span className="text-gray-700">Empowering communities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DestinationsSection data={siteData?.destinations} />
      <ServicesSection data={siteData?.services} />
      
      {/* Top Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Top Categories</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {siteData?.categories?.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.courses}</p>
                  </div>
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
            )) || (
              Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <button className="text-primary hover:text-primary/80 font-medium">
              Browse all categories 
              <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ScholarshipsSection data={siteData?.scholarships} />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Mtendere Education Consult?</h2>
            <p className="text-gray-600">Mtendere Education Consult is a renowned, dedicated, and committed professional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Professional Advisors</h3>
              <p className="text-gray-600">Professional tutors are not only skilled in their subjects but also understand the unique challenges faced by international students.</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">We Value Good Characters</h3>
              <p className="text-gray-600">Good characters are essential for success in any field. They help students build strong relationships, communicate effectively, and navigate challenges with resilience and integrity.</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">International Students Safety</h3>
              <p className="text-gray-600">We provide comprehensive support to help students navigate challenges and ensure a smooth transition to their new environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Inspiring Journeys of Our Students</h2>
            <p className="text-gray-600">Transforming Lives Through Education</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteData?.successStories?.map((story, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                <p className="text-gray-600 mb-4">{story.achievement}</p>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Read Story 
                  <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            )) || (
              Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <button className="text-primary hover:text-primary/80 font-medium">
              See More Success Stories 
              <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Global Education Journey?</h2>
          <p className="text-xl mb-8">Join hundreds of successful students who trusted Mtendere Education Consult to unlock opportunities abroad. Your success story starts now.</p>
          <button className="bg-accent text-white px-8 py-3 rounded-lg text-lg hover:bg-accent/90 transition-colors">
            Apply Now
          </button>
        </div>
      </section>

      <TestimonialsSection data={siteData?.testimonials} />
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {siteData?.faq?.map((item, index) => (
                <details key={index} className="border border-gray-200 rounded-lg">
                  <summary className="p-6 cursor-pointer font-semibold hover:bg-gray-50">
                    {item.question}
                  </summary>
                  <div className="p-6 pt-0 text-gray-600">
                    {item.answer}
                  </div>
                </details>
              )) || (
                Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-6 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">Ready to start your educational journey? Contact us today!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">{siteData?.contact?.phone || "+265999360325"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">{siteData?.contact?.email || "mtendereeduconsult@gmail.com"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Office Hours</h4>
                    <p className="text-gray-600">{siteData?.contact?.hours || "Mon - Fri: 8:00 AM - 6:00 PM"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div>
                  <input type="text" placeholder="Subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div>
                  <textarea rows={4} placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
