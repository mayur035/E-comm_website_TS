import './App.css';
import EditorPicks from './Components/pages/Home/Editor-s-Picks/Editor-s-picks';
import Header from './Components/layout/header/Header';
import HeroCarousel from './Components/pages/Home/HeroSection/heroCarousel';

function App() {
  return (
    <div className="App">
      <Header/>
      <HeroCarousel/>
      <EditorPicks/>
    </div>
  );
}

export default App;
