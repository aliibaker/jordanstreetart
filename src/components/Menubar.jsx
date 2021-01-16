import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import * as React from 'react';

import './Menubar.css'

const Menubar = ({showAbout, showTour}) => {
    return (
        <Navbar bg="dark" variant="dark" className="custom-menu">
        <Navbar.Brand href="/">
          <img src="ASA_logo_3.png"
               width = "30"
               height = "30"
               className = "d-inline-block align-top"
               alt = "ASA Logo"
               /> {' '}
          <span className = "lg-view">
            JORDAN STREET ART
          </span>
          <span className = "sm-view">
            JSA 
          </span>
          
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={showAbout}>About</Nav.Link>
          <Nav.Link onClick={showTour}>Tour</Nav.Link>
      </Nav>
        <Navbar.Collapse className = "justify-content-end">
            <span style={{color: "Tomato"}} onClick = {(e) => {
                            e.preventDefault();
                            window.open(`https://github.com/bakesbasha/ammanstreetart`);
                            }     }>
                <i style={{cursor:"click"}}className="fab fa-github fa-2x"></i>
            </span>
            
        </Navbar.Collapse>
      </Navbar>
    )
}
export default Menubar;
