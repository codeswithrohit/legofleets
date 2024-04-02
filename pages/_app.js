import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AdminNav from '@/components/AdminNav'; // Import AdminNav component
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Define an array of routes where Navbar and Footer should not be shown
  const restrictedRoutes = ['/Admin/dashboard', '/Admin/AddCar', '/confirmation']; // Add '/confirmation' route

  // Check if the current route is in the restrictedRoutes array
  const shouldHideNavbarAndFooter = restrictedRoutes.includes(router.pathname);

  // Check if the current route is an Admin route
  const isAdminRoute = router.pathname.startsWith('/Admin');

  return (
    <div>
      {/* Render Navbar, AdminNav, and Footer conditionally */}
      {!shouldHideNavbarAndFooter && !isAdminRoute && <Navbar />}
      {isAdminRoute && <AdminNav />}
      <Component {...pageProps} />
      {!shouldHideNavbarAndFooter && !isAdminRoute && <Footer />}
    </div>
  );
}
