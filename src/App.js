import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import EditFileUpload from "./components/fileUpload/edit.component";
import FileList from "./components/fileUpload/list.component";
import VisitorFileList from "./visitor/components/fileUpload/list.component";
import NewFileUpload from "./components/fileUpload/new.component";
import Index from './visitor/index';



function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
        Simple Resources Management Application
        </Link>
        <Link to={"/"} className="text-white">
        Admin
        </Link>
        <Link to={"/visitor"} className="text-white">
        visitor
        </Link>
      </Container>
    </Navbar>
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/fileUpload/new" element={<NewFileUpload />} />
            <Route path="/fileUpload/edit/:id" element={<EditFileUpload />} />
            <Route exact path='/' element={<FileList />} />
            <Route exact path='/visitor/fileUpload/list' element={<VisitorFileList />} />
            <Route exact path='/visitor' element={<Index />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
