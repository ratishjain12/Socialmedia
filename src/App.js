import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Navbar,Nav} from 'react-bootstrap';
import {Link,Route ,Switch,BrowserRouter as Router} from 'react-router-dom'
import Home from './pages/home/Home'
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './pages/home/Profile';
import Upload from './pages/home/Upload'
import  ProtectedRoute  from './components/protected-route'



function App() {
  const {loginWithRedirect} = useAuth0();
  const { logout ,isAuthenticated} = useAuth0();
  
  console.log(isAuthenticated)
  
  return (
    
      <div className="App">
      
      <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='text-white'>Social Media</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='ms-auto'>
        {isAuthenticated ? (<>
          <Nav.Link>
        <Link to="/"  className='text-white fs-5 fw-light text-decoration-none'>Home</Link>
        </Nav.Link>
          <Nav.Link  >
          <Link to='/upload'  className='text-white fs-5 fw-light text-decoration-none'>upload</Link>
          </Nav.Link>
          <Nav.Link  >
        <Link to='/profile'  className='text-white fs-5 fw-light text-decoration-none'>Profile</Link>
        </Nav.Link>
        <Nav.Link  >
        <button className='btn btn-dark' onClick={() => logout({ returnTo: window.location.origin })} >
          Logout
        </button>
      </Nav.Link>

        </>):(<>
          <Nav.Link>
        <Link to="/"  className='text-white fs-5 fw-light text-decoration-none'>Home</Link>
        </Nav.Link>
          <Nav.Link  >
          <Link to='/upload'  className='text-white fs-5 fw-light text-decoration-none'>upload</Link>
          </Nav.Link>
          <Nav.Link  >
        <Link to='/profile'  className='text-white fs-5 fw-light text-decoration-none'>Profile</Link>
        </Nav.Link>
        <Nav.Link>
      <button className='btn btn-dark' onClick={() => loginWithRedirect()}>
          Login
      </button>
      </Nav.Link>
      </>)}
        
          
       
        
        
        
      
      </Nav>
    </Navbar.Collapse>
  </Container>
  </Navbar>
 
    <Switch>
      <Route path="/" exact component = {Home} />
      <ProtectedRoute path="/profile" component = {Profile} />
      <ProtectedRoute path="/upload" component = {Upload} />
    </Switch>
  
    
  



    </div>
    
      
    
    
  );
}

export default App;
