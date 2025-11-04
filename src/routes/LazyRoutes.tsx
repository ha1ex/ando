import { lazy } from 'react';

// Lazy load route components for code splitting
export const Home = lazy(() => import('@/pages/Home'));
export const Catalog = lazy(() => import('@/pages/Catalog'));
export const Product = lazy(() => import('@/pages/Product'));
export const Lookbook = lazy(() => import('@/pages/Lookbook'));
export const About = lazy(() => import('@/pages/About'));
export const Info = lazy(() => import('@/pages/Info'));
export const Auth = lazy(() => import('@/pages/Auth'));
export const Favorites = lazy(() => import('@/pages/Favorites'));
export const Orders = lazy(() => import('@/pages/Orders'));
export const Checkout = lazy(() => import('@/pages/Checkout'));
export const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'));
export const NotFound = lazy(() => import('@/pages/NotFound'));

// Admin routes
export const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
export const AdminOrders = lazy(() => import('@/pages/admin/Orders'));
export const AdminProducts = lazy(() => import('@/pages/admin/Products'));
export const AdminCategories = lazy(() => import('@/pages/admin/Categories'));
export const AdminSiteSettings = lazy(() => import('@/pages/admin/SiteSettings'));
export const AdminLookbook = lazy(() => import('@/pages/admin/Lookbook'));
export const AdminInfoPages = lazy(() => import('@/pages/admin/InfoPages'));
export const AdminHeroSlides = lazy(() => import('@/pages/admin/HeroSlides'));
export const AdminAboutPage = lazy(() => import('@/pages/admin/AboutPage'));
