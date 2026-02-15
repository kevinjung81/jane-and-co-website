import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedInsights from './components/FeaturedInsights';
import Capabilities from './components/Capabilities';
import Footer from './components/Footer';
import InvoiceGenerator from './components/InvoiceGenerator';
import SignIn from './components/SignIn'; // Import the new Sign In component
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user, error } = useAuth(); // Monitor the user's login status
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans text-brand-charcoal bg-white min-h-screen flex flex-col">
      {error && (
        <div className="fixed bottom-4 right-4 z-[100] bg-white border border-red-200 shadow-xl p-4 max-w-sm border-l-4 border-l-red-500 animate-in slide-in-from-bottom-5">
           <h4 className="font-bold text-red-700 mb-1">Authentication Notice</h4>
           <p className="text-sm text-gray-600">{error}</p>
        </div>
      )}
      
      <Navbar setPage={setCurrentPage} /> 
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <FeaturedInsights />
            <Capabilities />
          </>
        ) : (
          /* LOGIC: If they click 'Invoice' but aren't logged in, 
             show the SignIn gate. Once they log in, show the generator.
          */
          user ? (
            <InvoiceGenerator />
          ) : (
            <SignIn onSuccess={() => setCurrentPage('invoice')} />
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;