import './App.css';
import Header from './Components/layout/header/Header';
import HeroCarousel from './Components/pages/Home/HeroSection/heroCarousel';

function App() {
  return (
    <div className="App">
      <Header/>
      <HeroCarousel/>
    </div>
  );
}

export default App;
