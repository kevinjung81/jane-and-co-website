import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-gray-800 pb-16">
          <div className="space-y-6">
            <Logo light className="h-10" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Jane & Company is a premier AI-driven consulting firm dedicated to unlocking value through data.
            </p>
            <div className="pt-4">
               <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-1">US Operations Only</p>
               <p className="text-gray-500 text-xs">We proudly serve clients exclusively within the United States.</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">The Firm</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-teal transition-colors">About Jane & Co</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">Our Leadership</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">Alumni</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">Offices</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Capabilities</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-teal transition-colors">Data & Analytics</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">AI Implementation</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">People Strategy</a></li>
              <li><a href="#" className="hover:text-brand-teal transition-colors">Transformation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <p className="text-sm text-gray-400 mb-2">10 Hudson Yards</p>
            <p className="text-sm text-gray-400 mb-6">New York, NY 10001</p>
            <a href="mailto:contact@janeandco.com" className="text-brand-teal font-medium hover:text-white transition-colors">
              contact@janeandco.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jane & Company. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;