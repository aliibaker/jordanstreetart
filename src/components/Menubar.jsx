import Navbar from 'react-bootstrap/Navbar'
import * as React from 'react'


const Menubar = () => {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          amman street art
        </Navbar.Brand>
        <Navbar.Collapse className = "justify-content-end">
            <span style={{color: "Tomato"}} onClick = {(e) => {
                            e.preventDefault();
                            window.open(`https://github.com/bakesbasha/mawaheb`);
                            }     }>
                <i className="fab fa-github fa-2x"></i>
            </span>
            
        </Navbar.Collapse>
      </Navbar>
    )
}
export default Menubar;
