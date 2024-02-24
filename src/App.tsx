import './App.css';
import EditorPicks from './Components/pages/Home/Editor-s-Picks/Editor-s-picks';
import Header from './Components/layout/header/Header';
import HeroCarousel from './Components/pages/Home/HeroSection/heroCarousel';
import BestProduct from './Components/pages/Home/BestSellerProduct/Best-Product';
import Carousel2 from './Components/pages/Home/Carousel2/Carousel2';
import SuggestionSec from './Components/pages/Home/randomSuggestion/SuggestionSec';
import FeaturedSection from './Components/pages/Home/FeaturedSection/Featured-section';
import Footer from './Components/layout/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <HeroCarousel/>
      <EditorPicks/>
      <BestProduct/>
      <Carousel2/> 
      <SuggestionSec/>
      <FeaturedSection/>
      <Footer/>
    </div>
  );
}

export default App;
