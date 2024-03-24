import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define an array of routes where Navbar and Footer should not be shown
  const restrictedRoutes = ['/Admin/dashboard', '/Admin/AddCar', '/confirmation']; // Add '/confirmation' route

  // Check if the current route is in the restrictedRoutes array
  const shouldHideNavbarAndFooter = restrictedRoutes.includes(router.pathname);

  return (
    <div>
      {/* Render Navbar and Footer conditionally */}
      {!shouldHideNavbarAndFooter && <Navbar />}
      <Component {...pageProps} />
      {!shouldHideNavbarAndFooter && <Footer />}
    </div>
  );
}
