import React from 'react';
import { BarChart3, BrainCircuit, Users, LineChart, ShieldCheck, Zap } from 'lucide-react';
import { Capability } from '../types';

const services: Capability[] = [
  {
    id: '1',
    title: 'Advanced Data Analytics',
    description: 'Converting raw data into strategic assets using predictive modeling and big data architectures.',
    icon: <BarChart3 className="w-8 h-8" />,
  },
  {
    id: '2',
    title: 'AI Implementation',
    description: 'Deploying generative AI and machine learning solutions to automate core HR processes.',
    icon: <BrainCircuit className="w-8 h-8" />,
  },
  {
    id: '3',
    title: 'Executive Dashboards',
    description: 'Real-time, C-suite visibility into organizational health and performance metrics.',
    icon: <LineChart className="w-8 h-8" />,
  },
  {
    id: '4',
    title: 'Workforce Strategy',
    description: 'Optimizing talent acquisition and retention through data-backed behavioral insights.',
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: '5',
    title: 'Governance & Compliance',
    description: 'Ensuring AI ethics and regulatory compliance within US employment law frameworks.',
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    id: '6',
    title: 'Digital Transformation',
    description: 'Modernizing legacy HR systems for agility, speed, and cross-functional integration.',
    icon: <Zap className="w-8 h-8" />,
  },
];

const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 bg-brand-light">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 max-w-3xl">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">Our Capabilities</h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Jane & Company combines deep industry expertise with cutting-edge analytical rigor. 
            We do not just advise; we build the technical foundations for enduring success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-white border border-gray-200 text-brand-teal shadow-sm group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl text-brand-charcoal mb-4 group-hover:text-brand-teal transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base pr-4 border-l border-gray-200 pl-4 group-hover:border-brand-teal transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;