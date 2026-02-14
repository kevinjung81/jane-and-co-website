import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Corporate Architecture" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 px-3 py-1 bg-brand-teal/10 border-l-2 border-brand-teal">
            <span className="text-brand-teal text-sm font-bold tracking-widest uppercase">
              Premier HR & Data Consulting
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white font-medium mb-8">
            Transforming U.S. Enterprises Through <span className="text-brand-teal italic">Advanced Data & AI.</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-gray-300 font-light max-w-2xl mb-12 leading-relaxed">
            We partner with leaders to unlock actionable insights, optimizing workforce potential and driving sustainable value in a complex digital landscape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-brand-teal text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2">
              Explore Our Capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-white border border-white hover:bg-white hover:text-brand-dark transition-all duration-300">
              Contact Partners
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;