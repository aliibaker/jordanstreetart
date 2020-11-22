import GrafMap from './components/GrafMap'
import Menubar from './components/Menubar'
import './App.css'
function App() {
  return (
    <div>
      <div id = 'menu'>
        <Menubar/>
      </div>
      <div className = "map_box_container">
        <GrafMap/>
      </div>
      
    </div>
  );
}

export default App;
