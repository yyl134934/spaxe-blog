import { ThemeProvider } from 'next-themes';
import ThemeSwitch from '@/components/ThemeSwitch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/main.css';

export default function App() {
  return (
    <ThemeProvider attribute='class'>
      <Header />
      <Footer />
    </ThemeProvider>
  );
}
