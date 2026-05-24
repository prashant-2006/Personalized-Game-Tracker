import { FcGoogle } from 'react-icons/fc';
import { signInAction } from '../_lib/actions';

export const metadata = {
  title: "Login | GameShelf",
};

export default function SignInPage() {
  return (
    // Replaced hardcoded margins with a flex layout that centers perfectly, 
    // and added a subtle radial gradient glow in the background.
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      
      {/* Subtle Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <form
        action={signInAction}
        // Applied Glassmorphism (backdrop-blur, semi-transparent backgrounds, subtle borders)
        className="relative z-10 dark:bg-gray-900/60 bg-white/60 backdrop-blur-xl p-10 sm:p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col items-center space-y-8 max-w-md w-full"
      >
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sign in to access your GameShelf
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="submit"
          className="group flex items-center justify-center gap-4 dark:bg-white/5 bg-white text-gray-900 dark:text-white px-6 py-4 rounded-2xl border border-gray-300 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-white/10 transition-all duration-300 w-full shadow-sm hover:shadow-md hover:shadow-indigo-500/20"
        >
          {/* Added a subtle scale effect to the Google icon on hover */}
          <div className="bg-white p-1 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
            <FcGoogle size={24} />
          </div>
          <span className="font-semibold text-lg">Continue with Google</span>
        </button>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 dark:text-gray-500 text-center px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
        
      </form>
    </div>
  );
}