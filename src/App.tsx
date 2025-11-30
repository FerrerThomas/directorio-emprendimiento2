import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CategoriesGrid from './components/CategoriesGrid';
import HighlightedGrid from './components/HighlightedGrid';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import AdminLayout from './layouts/AdminLayout';
import CreateBusinessPage from './pages/admin/CreateBusinessPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <CategoriesGrid />
      <HighlightedGrid />
      <ContactSection />
      <Footer />
    </>
  );
}

function CategoriesPage() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <CategoriesGrid initialCategoryId={id} hideHeader />
      <HighlightedGrid />
      <ContactSection />
      <Footer />
    </>
  );
}

import ScrollToAnchor from './components/ScrollToAnchor';

function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:id" element={<CategoriesPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="text-gray-500">Dashboard en construcción...</div>} />
          <Route path="emprendimientos/nuevo" element={<CreateBusinessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
