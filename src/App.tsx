import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CategoriesGrid from './components/CategoriesGrid';
import HighlightedGrid from './components/HighlightedGrid';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <CategoriesGrid />
      <HighlightedGrid />
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:id" element={<CategoriesPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
