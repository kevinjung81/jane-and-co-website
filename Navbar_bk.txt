import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Search, User as UserIcon, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Industries', href: '#industries' },
    { name: 'Insights', href: '#insights' },
    { name: 'Careers', href: '#careers' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-gray-200 py-3 shadow-sm'
          : 'bg-white border-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-6 text-sm font-medium tracking-wide text-brand-charcoal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group py-2 hover:text-brand-teal transition-colors"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-300 mx-4"></div>

          <div className="flex items-center space-x-5">
            <button className="text-brand-charcoal hover:text-brand-teal transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-gray-200" />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium hidden xl:block">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button 
                  onClick={() => logout()}
                  className="text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  Sign Out <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="text-xs font-bold uppercase tracking-widest text-brand-teal border border-brand-teal px-5 py-2 hover:bg-brand-teal hover:text-white transition-all duration-300"
              >
                Client Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button className="text-brand-charcoal">
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-charcoal"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-6 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-serif font-medium text-brand-charcoal border-b border-gray-100 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex items-center justify-between">
             {user ? (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-center text-sm font-bold uppercase tracking-widest text-red-600 border border-red-200 px-5 py-3"
                >
                  Sign Out ({user.displayName?.split(' ')[0]})
                </button>
             ) : (
                <button 
                  onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                  className="w-full text-center text-sm font-bold uppercase tracking-widest text-white bg-brand-teal px-5 py-3"
                >
                  Client Login
                </button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;