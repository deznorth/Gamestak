import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { PersonSquare, Gear } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { commonSelectors } from 'pages/selectors';
import { SITEMAP_NAVBAR } from 'app/sitemap';
import * as actions from 'app/modules/actions';

import './style.scss';

const NavBar = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(commonSelectors.selectIsAuthenticated);
  const isAdmin = useSelector(commonSelectors.selectIsAdmin);

  const handleShowAuth = view => {
    dispatch(actions.showModal(view));
  };

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
            {
              (isAuthenticated && isAdmin) && <Button variant="text" className="mr-2"><Gear size={18} className="gs-navbar__gear-icon"/></Button>
            }
            {
              !isAuthenticated && (
                <>
                  <Button variant="text" className="mr-2" onClick={() => handleShowAuth('signin')}>
                    <PersonSquare size={20} className="mr-1"/> SIGN IN
                  </Button>
                  <Button variant="primary" onClick={() => handleShowAuth('signup')}>SIGN UP!</Button>
                </>
              )
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;