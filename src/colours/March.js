import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge, h4, h1, h3, h2, h6 } from '@themesberg/react-bootstrap';


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


const dataBar = {
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
    <div className='header mt-3 mb-5 text-center'>
      <h1 className='title'>Colours Edition March</h1>      
    </div>
    
    <Container>
      <Row>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Active visitors</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">visitors</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Average views</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">per day</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Average duration</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">m</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Views today</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">views</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Views this week</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">views</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>
        <Col xs={4}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<h4>Views this month</h4>
      				<div className="d-flex flex-row">
		          		<h2 className="me-3">0</h2>      					
		          		<h6 className="mt-3">views</h6>      					
      				</div>
      			</Card.Body>
    		</Card>
        </Col>  
        <Col xs={12}>
        	<Card border="light" className="bg-white shadow-sm mb-4">
      			<Card.Body>
      				<Bar data={data} options={options} />
      			</Card.Body>
    		</Card>
        </Col>        
      </Row>
    </Container>
  </>
);

export default PieChart;