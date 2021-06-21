import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import axios from 'axios';


var data = {
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
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default () => {
  console.log("yaya")
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  // console.log(process.env.REACT_APP_BASE_URL)
  useEffect(() => {
    axios.get('http://localhost:2000/colours/viewsbrowsers/march')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].browser);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMarch(data);
      });
    axios.get('http://localhost:2000/colours/viewsbrowsers/april')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].browser);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setApril(data);
      });
    axios.get('http://localhost:2000/colours/viewsbrowsers/may')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].browser);
          arr2.push(res.data[a].counts);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMay(data);
      });
    axios.get('http://localhost:2000/colours/viewsbrowsers/june')
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].browser);
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
        <h1 className='title'>Per Browser</h1>
      </div>

      <Container>
        <Row>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">March</h5>
                <Pie data={march} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">April</h5>
                <Pie data={april} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">May</h5>
                <Pie data={may} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">June</h5>
                <Pie data={june} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
};

// export default PieChart;