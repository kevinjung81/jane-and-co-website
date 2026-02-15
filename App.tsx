const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  // Define the one and only admin email
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
          /* THE GATEKEEPER */
          isAdmin ? (
            <InvoiceGenerator />
          ) : user ? (
            /* Logged in but NOT Jane */
            <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
                <p className="text-gray-600">Your account ({user.email}) is not authorized to access this tool.</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-brand-teal font-bold underline">Try another account</button>
              </div>
            </div>
          ) : (
            /* Not logged in at all */
            <SignIn />
          )
        )}
      </main>
      <Footer />
    </div>
  );
};


// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import FeaturedInsights from './components/FeaturedInsights';
// import Capabilities from './components/Capabilities';
// import Footer from './components/Footer';
// import InvoiceGenerator from './components/InvoiceGenerator';
// import SignIn from './components/SignIn'; // Import the new Sign In component
// import { AuthProvider, useAuth } from './context/AuthContext';

// const AppContent: React.FC = () => {
//   const { user, error } = useAuth(); // Monitor the user's login status
//   const [currentPage, setCurrentPage] = useState('home');

//   return (
//     <div className="font-sans text-brand-charcoal bg-white min-h-screen flex flex-col">
//       {error && (
//         <div className="fixed bottom-4 right-4 z-[100] bg-white border border-red-200 shadow-xl p-4 max-w-sm border-l-4 border-l-red-500 animate-in slide-in-from-bottom-5">
//            <h4 className="font-bold text-red-700 mb-1">Authentication Notice</h4>
//            <p className="text-sm text-gray-600">{error}</p>
//         </div>
//       )}
      
//       <Navbar setPage={setCurrentPage} /> 
      
//       <main className="flex-grow">
//         {currentPage === 'home' ? (
//           <>
//             <Hero />
//             <FeaturedInsights />
//             <Capabilities />
//           </>
//         ) : (
//           /* LOGIC: If they click 'Invoice' but aren't logged in, 
//              show the SignIn gate. Once they log in, show the generator.
//           */
//           user ? (
//             <InvoiceGenerator />
//           ) : (
//             <SignIn onSuccess={() => setCurrentPage('invoice')} />
//           )
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };

// export default App;