import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface SignInProps {
  onSuccess: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, this triggers success. 
    // You can later link this to Firebase Auth for real password validation.
    onSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-2">
            {isSignUp ? 'Create Account' : 'Partner Login'}
          </h2>
          <p className="text-gray-500 text-sm">Access the Jane & Company Invoice Suite</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all" placeholder="name@company.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-dark text-white font-bold py-4 rounded-lg hover:bg-brand-teal transition-colors flex items-center justify-center gap-2 group">
            {isSignUp ? 'Register' : 'Sign In'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-brand-teal font-bold hover:underline"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;