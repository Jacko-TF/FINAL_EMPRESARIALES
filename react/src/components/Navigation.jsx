import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Sistema de Matrícula</Navbar.Brand>
      <Nav className="me-auto">
        {isAuth && (
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/matricula">Matricula</Nav.Link>
            <Nav.Link href="/estudiante">Estudiante</Nav.Link>
            <NavDropdown title="Tablas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/departamento">Departamento</NavDropdown.Item>
              <NavDropdown.Item href="/semestre">Semestre</NavDropdown.Item>
              <NavDropdown.Item href="/carrera">Carrera</NavDropdown.Item>
              <NavDropdown.Item href="/pago">Pago</NavDropdown.Item>
              <NavDropdown.Item href="/curso">Curso</NavDropdown.Item>
            </NavDropdown>
          </>
        )}
      </Nav>
      <Nav>
        {isAuth ? (
          <Nav.Link href="/logout">Logout</Nav.Link>
        ) : (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
