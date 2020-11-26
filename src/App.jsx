import GrafMap from './components/GrafMap'
import Menubar from './components/Menubar'
import CookieModal from './components/CookieModal'
import './App.css'
function App() {
  return (
    <div>
      <CookieModal></CookieModal>
      <div id = 'menu'>
        <Menubar/>
      </div>
      <section className = "map_box_container">
        <GrafMap/>
      </section>
      
    </div>
  );
}

export default App;
