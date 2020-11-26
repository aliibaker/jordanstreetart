import Navbar from 'react-bootstrap/Navbar'
import * as React from 'react'


const Menubar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img src="ASA_logo_3.png"
               width = "30"
               height = "30"
               className = "d-inline-block align-top"
               alt = "ASA Logo"
               /> {' '}
          AMMAN STREET ART
        </Navbar.Brand>
        <Navbar.Collapse className = "justify-content-end">
            <span style={{color: "Tomato"}} onClick = {(e) => {
                            e.preventDefault();
                            window.open(`https://github.com/bakesbasha/ammanstreetart`);
                            }     }>
                <i className="fab fa-github fa-2x"></i>
            </span>
            
        </Navbar.Collapse>
      </Navbar>
    )
}
export default Menubar;
