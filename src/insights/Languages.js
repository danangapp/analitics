import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';


const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Per Click</h1>
    </div>

    <Container>
      <Row>
        <Col xs={6} className="text-center">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">March</h5>
              <Pie data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="text-center">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">April</h5>
              <Pie data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="text-center">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">May</h5>
              <Pie data={data} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} className="text-center">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">June</h5>
              <Pie data={data} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default PieChart;