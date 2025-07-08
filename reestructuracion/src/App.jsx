import './styles/styles.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import MissionVision from './components/MissionVision';
import WhatWeDo from './components/WhatWeDo';
import Projects from './components/Projects';
import Donations from './components/Donations';
import Community from './components/Community';
import Support from './components/Support';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionVision />
        <WhatWeDo />
        <Projects />
        <Donations />
        <Community />
        <Support />
      </main>
      <Footer />
    </>
  );
}

export default App;
