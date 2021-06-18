import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import axios from 'axios';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default () => {
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:2000/colours/viewsdevices/march')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].devices);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMarch(data);
      });
    axios.get('http://localhost:2000/colours/viewsdevices/april')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].devices);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        console.log(data)
        setApril(data);
      });
    axios.get('http://localhost:2000/colours/viewsdevices/may')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].devices);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMay(data);
      });
    axios.get('http://localhost:2000/colours/viewsdevices/june')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].devices);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setJune(data);
      });
  }, []);


  return (
    <>
      <div className='header'>
        <h1 className='title'>Per Device</h1>
      </div>

      <Container>
        <Row>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">March</h5>
                <Line data={march} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">April</h5>
                <Line data={april} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">May</h5>
                <Line data={may} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">June</h5>
                <Line data={june} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
};

// export default PieChart;