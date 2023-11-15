import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SignupCurd from '../axioss/SignupCurd';
import LoginCurd from '../axioss/LoginCurd';
import ClientCurd from '../Client/ClientCurd';
import ServiceproCurd from '../Service provider/ServiceproCurd';
import Forgotpass from '../axioss/Forgotpass'


function Mainnavcomp() {
  return (
    <BrowserRouter>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href="/signup">Signup-here</Nav.Link>
            <Nav.Link href="/login">Login-here</Nav.Link>
            <Nav.Link href="/fpass">Forgot-password</Nav.Link>
            {/* <Nav.Link href="/client">Client</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
    <Route path='/signup' element={<SignupCurd/>}></Route>
    <Route path='/login' element={<LoginCurd/>}></Route>
    <Route path='/client' element={<ClientCurd/>}></Route>
    <Route path='/spro' element={<ServiceproCurd/>}></Route>
    <Route path='/fpass' element={<Forgotpass/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default Mainnavcomp;