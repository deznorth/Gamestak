import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { PersonSquare, Gear } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { SITEMAP_NAVBAR } from 'app/sitemap';

import './style.scss';

const NavBar = () => {
  return (
    <Navbar fixed="top" expand="md" className="gs-navbar">
      <Container fluid className="pl-5 pr-5">
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
            {/* This will be hidden once I add the auth system */}
            <Button variant="text" className="mr-2"><Gear size={18} className="gs-navbar__gear-icon"/></Button>
            <Button variant="text" className="mr-2">
              <PersonSquare size={20} className="mr-1"/> SIGN IN
            </Button>
            <Button variant="primary">SIGN UP!</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;