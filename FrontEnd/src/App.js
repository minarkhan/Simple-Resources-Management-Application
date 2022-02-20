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
import LinkList from "./components/link/list.component";
import LinkEdit from "./components/link/edit.component";
import LinkNew from "./components/link/new.component";
import LinkListIndex from "./visitor/components/link/list.component";
import HtmlSnippetList from "./components/htmlsnippet/list.component";
import HtmlSnippetEdit from "./components/htmlsnippet/edit.component";
import HtmlSnippetNew from "./components/htmlsnippet/new.component";
import HtmlSnippetIndex from "./visitor/components/htmlsnippet/list.component";





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
          <Routes>
            <Route path="/fileUpload/new" element={<NewFileUpload />} />
            <Route path="/fileUpload/edit/:id" element={<EditFileUpload />} />
            <Route exact path='/' element={<FileList />} />
            <Route path='/visitor/fileUpload/list' element={<VisitorFileList />} />
            <Route path='/visitor' element={<Index />} />
            <Route path='/link' element={<LinkList />} />
            <Route path='/link/edit/:id' element={<LinkEdit />} />
            <Route path='/link/new' element={<LinkNew />} />
            <Route path='/visitor/link' element={<LinkListIndex />} />
            <Route path='/htmlsnippet' element={<HtmlSnippetList />} />
            <Route path='/htmlsnippet/edit/:id' element={<HtmlSnippetEdit />} />
            <Route path='/htmlsnippet/create' element={<HtmlSnippetNew />} />
            <Route path='/visitor/htmlsnippet' element={<HtmlSnippetIndex />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
