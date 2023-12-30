import React,{useState} from 'react'
import './Navbar.css'
import './css/vendor/animate.css/animate.min.css'
import './css/vendor/bootstrap/css/bootstrap.min.css'
import './css/vendor/bootstrap-icons/bootstrap-icons.css'
import './css/vendor/boxicons/css/boxicons.min.css'
import './css/vendor/glightbox/css/glightbox.min.css'
import './css/vendor/swiper/swiper-bundle.min.css'
import { HashLink as Link } from 'react-router-hash-link'
import { Navbar, Nav } from 'react-bootstrap';
export default function Navbarr() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (<>
  <Navbar bg="white" expand="lg" fixed="top" expanded={expanded} >
     <header id="header" className="fixed-top d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">
    {/* <h1 className="logo"><a href="/">IT-IMPACT</a></h1> */}
    {/* <Navbar.Brand href="/" color='black'><h1 className="logo">IT-IMPACT</h1></Navbar.Brand> */}
  
    {/* uncomment below for img logo */}
    <Navbar.Brand href="/#" className="logo"><img src="logo.png" alt="" className="img-fluid"/></Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav id="navbar" className="navbar navbar-nav ms-auto" style={{margin: '0 6.5rem'}}>
        
        <ul >
          <li><p className="nav-link "><Link to="#" style={{textDecoration:'none',fontWeight:'bold'}}>User Profile Analysis</Link></p></li>
          <li><p className="nav-link" ><Link to="#" style={{textDecoration:'none',fontWeight:'bold'}}>Security Scanner</Link></p></li>
          {/* <li><p className="nav-link scrollto" ><Link to="" >Services</Link></p></li> */}
          
          
        </ul>
        
        <i className="bi bi-list mobile-nav-toggle"></i>
      
      </Nav>
      </Navbar.Collapse>
    </div>
  </header> 
  </Navbar>
  
</>
  )
}
