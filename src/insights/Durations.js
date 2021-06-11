import React from 'react';
import { Bar  } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';


const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
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
		          	<Bar data={data} options={options} />
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={6} className="text-center">
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h5 className="mb-4">April</h5>
		          	<Bar data={data} options={options} />
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={6} className="text-center">
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h5 className="mb-4">May</h5>
		          	<Bar data={data} options={options} />
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={6} className="text-center">
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h5 className="mb-4">June</h5>
		          	<Bar data={data} options={options} />
      			</Card.Body>
    		</Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default PieChart;