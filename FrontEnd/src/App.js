import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { BrowserRouter as Router } from "react-router-dom";
import RouteList from './components/RouteList';

function App() {
  return (<Router>
    <Navbar bg="primary" variant="dark" className='text-white'>
      <Container>
        <Navbar.Brand href="/visitor">Simple Resources Management Application</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Admin</Nav.Link>
          <Nav.Link href="/visitor">visitor</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container className="">
      <Row>
        <Col md={12}>
          <RouteList/>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
