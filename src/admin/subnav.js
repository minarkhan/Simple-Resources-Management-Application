import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


export default function SubNav() {
    return (
        <Navbar bg="dark" variant="dark" className='mb-4'>
            <Container>
                <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">File</Nav.Link>
                    <Nav.Link href="/htmlsnippet">HTML Snippet</Nav.Link>
                    <Nav.Link href="/link">Link</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
