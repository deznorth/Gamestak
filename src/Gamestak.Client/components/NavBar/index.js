import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import SITEMAP from 'util/sitemap';

import './style.scss';

const NavBar = props => {
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
              Object.values(SITEMAP).map((page, index) => {
                return (
                  <LinkContainer key={index} to={page.path} exact={page.exact}>
                    <Nav.Link eventKey={page.name}>{page.name.toUpperCase()}</Nav.Link>
                  </LinkContainer>
                );
              })
            }
          </Nav>
          <div>
            <LinkContainer to="/login" exact className="mr-3">
              <Button variant="text">SIGN IN</Button>
            </LinkContainer>
            <LinkContainer to="/signup" exact>
              <Button variant="primary">SIGN UP!</Button>
            </LinkContainer>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;