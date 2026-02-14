import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Insight } from '../types';

const insights: Insight[] = [
  {
    id: '1',
    title: 'The Future of Qlik Integration in HR Analytics',
    category: 'Data Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    id: '2',
    title: 'Scaling AI Strategy Across Enterprise Silos',
    category: 'Artificial Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    link: '#',
  },
  {
    id: '3',
    title: 'Workforce Optimization: The 2025 Outlook',
    category: 'Human Resources',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    link: '#',
  },
];

const FeaturedInsights: React.FC = () => {
  return (
    <section id="insights" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-4">Featured Insights</h2>
            <p className="text-gray-500 font-light text-lg">Our latest thinking on the issues that matter most in business.</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-brand-teal font-bold uppercase tracking-widest text-xs hover:text-brand-dark transition-colors">
            View All Insights <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((item) => (
            <a 
              key={item.id} 
              href={item.link} 
              className="group relative block h-[500px] overflow-hidden bg-gray-100 cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-1 bg-brand-teal mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="block text-brand-teal text-xs font-bold uppercase tracking-widest mb-3">
                  {item.category}
                </span>
                <h3 className="font-serif text-2xl text-white leading-tight mb-4">
                  {item.title}
                </h3>
                <span className="inline-flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
                  Read Article <ArrowUpRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInsights;