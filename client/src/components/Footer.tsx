import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
              </svg>
              <span className="text-xl font-bold">Mtendere Education Consult</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in international education, helping students achieve their dreams of studying abroad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 5.5c3.044 0 5.486 2.44 5.486 5.483 0 3.044-2.442 5.484-5.486 5.484-3.043 0-5.485-2.44-5.485-5.484C6.532 7.94 8.974 5.5 12.017 5.5zm0 2.195c-1.813 0-3.288 1.474-3.288 3.288s1.475 3.289 3.288 3.289 3.289-1.475 3.289-3.289-1.476-3.288-3.289-3.288zm5.486-2.195c0-.729-.592-1.321-1.321-1.321-.729 0-1.321.592-1.321 1.321s.592 1.321 1.321 1.321c.729 0 1.321-.592 1.321-1.321zM12.017 2C8.85 2 8.481 2.013 7.239 2.07c-1.24.057-2.085.253-2.823.541-.765.298-1.414.695-2.061 1.342C1.708 4.6 1.31 5.249 1.013 6.014c-.288.738-.484 1.583-.541 2.823C.413 10.08.4 10.449.4 13.617s.013 3.537.072 4.779c.057 1.24.253 2.085.541 2.823.298.765.695 1.414 1.342 2.061.647.647 1.296 1.044 2.061 1.342.738.288 1.583.484 2.823.541 1.242.057 1.611.07 4.779.07s3.537-.013 4.779-.07c1.24-.057 2.085-.253 2.823-.541.765-.298 1.414-.695 2.061-1.342.647-.647 1.044-1.296 1.342-2.061.288-.738.484-1.583.541-2.823.057-1.242.07-1.611.07-4.779s-.013-3.537-.07-4.779c-.057-1.24-.253-2.085-.541-2.823-.298-.765-.695-1.414-1.342-2.061C17.851 2.708 17.202 2.31 16.437 2.013c-.738-.288-1.583-.484-2.823-.541C15.555 2.013 15.186 2 12.017 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">University Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Scholarship Advisory</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Virtual Consultations</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Visa Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#destinations" className="hover:text-white transition-colors">United Kingdom</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">France</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Germany</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Canada</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>+265999360325</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>mtendereeduconsult@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mtendere Education Consult. All rights reserved. Registered under the Malawi Government Business Registration Act (No 12 of 2012).</p>
          <div className="mt-2">
            <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 text-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
