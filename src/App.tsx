import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CategoriesGrid from './components/CategoriesGrid';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Carousel />
      <CategoriesGrid />
    </div>
  );
}

export default App;
