import GrafMap from './components/GrafMap';
import Consumer from './components/GrafMap'
import Menubar from './components/Menubar';

import CookieModal from './components/Modals/CookieModal';
import AboutModal from './components/Modals/AboutModal';
import TourModal from './components/Modals/TourModal';
import TutorialModal from './components/Modals/TutorialModal';

import {useState} from 'react';

import './App.css'
function App() {

  const [showAbout, setShowAbout] = useState(false);
  const [showTour, setShowTour] = useState(false)

  return (
    <div>
      <CookieModal></CookieModal>
      <div id = 'menu'>
        <Menubar showAbout={()=>setShowAbout(true)} showTour={()=>setShowTour(true)}/>
      </div>
      <div id = "map">
        <Consumer/>
      </div>

      {showAbout === true ? <AboutModal show={showAbout} handleClose={()=>setShowAbout(false)}/>:null}
      {showTour === true ? <TourModal show={showTour} handleClose={()=>setShowTour(false)}/>:null }


      
    </div>
  );
}

export default App;
