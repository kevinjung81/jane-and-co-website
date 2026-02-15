import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedInsights from './components/FeaturedInsights';
import Capabilities from './components/Capabilities';
import Footer from './components/Footer';
import InvoiceGenerator from './components/InvoiceGenerator';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  // Define the one and only admin email for Jane & Company
  const ADMIN_EMAIL = 'jane.lee@thejaneandco.com';
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <div className="font-sans text-brand-charcoal bg-white min-h-screen flex flex-col">
      <Navbar setPage={setCurrentPage} /> 
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <FeaturedInsights />
            <Capabilities />
          </>
        ) : (
          /* Admin Gatekeeper Logic */
          isAdmin ? (
            <InvoiceGenerator />
          ) : user ? (
            <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
                <p className="text-gray-600">Your account ({user.email}) is not authorized.</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-brand-teal font-bold underline">Try another account</button>
              </div>
            </div>
          ) : (
            <SignIn />
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

// This is the "default export" that index.tsx is looking for
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;