import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";


export default function SubNav() {
    return (
        <Navbar bg="dark" variant="dark" className='mb-4'>
            <Container>
                <Navbar.Brand href="/visitor">Visitor Dashboard</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/visitor">File</Nav.Link>
                    <Nav.Link href="/visitor/htmlsnippet">HTML Snippet</Nav.Link>
                    <Nav.Link href="/visitor/link">Link</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
