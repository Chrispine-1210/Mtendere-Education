import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-text text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-poppins font-bold text-2xl text-white mb-4">
              Mtendere Education
            </h3>
            <p className="text-gray-300 mb-6">
              Your trusted partner for international education success.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  University Selection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Application Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Scholarship Guidance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Visa Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  United States
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  United Kingdom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Canada
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Australia
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@mtendereeducation.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +27 11 123 4567
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Johannesburg, South Africa
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mtendere Education Consult. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
