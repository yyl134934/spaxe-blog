import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import '@/styles/main.css';

export default function App() {
  return (
    <ThemeProvider attribute='class'>
      <Layout />
    </ThemeProvider>
  );
}
