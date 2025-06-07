import { FcGoogle } from 'react-icons/fc';
import { signInAction } from '../_lib/actions';

export const metadata = {
    title: "Login",
};

export default function SignInPage() {
  return (
    <div className="max-h-screen mt-32 flex items-center justify-center dark:bg-900 bg-300 px-4">
      <form
        action={signInAction}
        className="dark:bg-gray-800 bg-white p-10 rounded-xl shadow-lg flex flex-col items-center space-y-6 max-w-sm w-full"
      >
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-gray-400 text-center">Use your Google account to continue</p>

        <button
          type="submit"
          className="flex items-center justify-center gap-3 dark:bg-white bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition w-full"
        >
          <FcGoogle size={24} />
          <span className="font-semibold">Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}
