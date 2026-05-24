// app/layout.js
import '@/app/_styles/global.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import { auth } from './_lib/auth';
import AuthProvider from './components/AuthProvider'; 

export const metadata = {
  title: 'GameShelf',
  description: 'Connect with friends and the world around you.',
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      {/* 1. Add flex and min-h-screen to the body */}
      <body className="min-h-screen flex flex-col w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar session={session} />
          
          {/* 2. Use flex-1 so it dynamically fills all space under the navbar. 
                 NOTE: If your Navbar has 'fixed top-0', change 'mt-16' to 'pt-16' or 'pt-20' */}
          <main className="flex-1 flex flex-col w-full relative">
            <AuthProvider>{children}</AuthProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}