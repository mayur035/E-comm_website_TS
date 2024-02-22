import './App.css';
import EditorPicks from './Components/pages/Home/Editor-s-Picks/Editor-s-picks';
import Header from './Components/layout/header/Header';
import HeroCarousel from './Components/pages/Home/HeroSection/heroCarousel';
import BestProduct from './Components/pages/Home/BestSellerProduct/Best-Product';

function App() {
  return (
    <div className="App">
      <Header/>
      <HeroCarousel/>
      <EditorPicks/>
      <BestProduct/>
    </div>
  );
}

export default App;
