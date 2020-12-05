import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { SITEMAP_NAVBAR } from 'util/sitemap';

import './style.scss';

const NavBar = () => {
  return (
    <Navbar fixed="top" expand="md" className="gs-navbar">
      <Container fluid>
        <Navbar.Brand>
          Gamestak
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <Nav>
            {
              Object.values(SITEMAP_NAVBAR).map((page, index) => {
                return (
                  <LinkContainer key={index} to={page.path} exact={page.exact}>
                    <Nav.Link eventKey={page.path}>{page.name.toUpperCase()}</Nav.Link>
                  </LinkContainer>
                );
              })
            }
          </Nav>
          <div>
            <Button variant="text" className="mr-3">SIGN IN</Button>
            <Button variant="primary">SIGN UP!</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;