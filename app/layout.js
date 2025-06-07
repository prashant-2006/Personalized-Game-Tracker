// app/layout.js
import '@/app/_styles/global.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import { auth } from './_lib/auth';

export const metadata = {
  title: 'GameShelf',
  description: 'Connect with friends and the world around you.',
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar session={session} />
          <main className='mt-16'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
