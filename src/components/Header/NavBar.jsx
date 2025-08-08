import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../utils/AuthProvider';

function NavBar() {

  const {loggedinUser,user,isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  
  const handleLogout = () =>{
    if(isAuthenticated === true)
    setIsAuthenticated(false);
  }
  
  return (
    
    <Navbar expand="lg" className="bg-green-500  z-[4] sticky top-0">
      
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><span className="text-white">Home</span></Nav.Link>
            <Nav.Link onClick={()=>{localStorage.clear();handleLogout()}}><span className="text-white">Logout</span></Nav.Link>
            <Nav.Link as={Link} to="/create-group"><span className="text-white">create+</span></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  ); 
}

export default NavBar;
