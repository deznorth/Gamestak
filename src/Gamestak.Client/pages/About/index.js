import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const AboutPage = () => {
  return (
    <Container>
      <Jumbotron>
        <h1 className="display-1">Gamestak</h1>
        <p>A videogame store built for my final project.</p>
        <p><strong>Author:</strong> David Rojas Gonzalez</p>
        <p><strong>N#:</strong> N01236006</p>
        <hr />
        <p><strong>Institution:</strong> University of North Florida</p>
        <p><strong>Class:</strong> COP3855 - Web Systems Development</p>
        <p><strong>Professor:</strong> Richa Jethwani</p>
        <p><strong>Due Date:</strong> December 8th, 2020</p>
      </Jumbotron>
      <Container>
        <Row className="mb-3">
          <h1>Used Technologies</h1>
        </Row>
        <Row>
          <Col>
            <h5>Database</h5>
            <hr />
            <p>SQL Server</p>
          </Col>
          <Col>
            <h5>Back-end</h5>
            <hr />
            <p>ASP.NET Core</p>
            <p>Dapper</p>
          </Col>
          <Col>
            <h5>Front-end</h5>
            <hr />
            <p>SCSS</p>
            <p>Javascript</p>
            <p>Webpack</p>
            <p>ReactJS</p>
            <p>Redux</p>
          </Col>
          <Col>
            <h5>Design</h5>
            <hr />
            <p>Adobe XD</p>
          </Col>
          <Col>
            <h5>Project Management</h5>
            <hr />
            <p>Trello</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AboutPage;