import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import axios from 'axios';

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

const PieChart = () => {
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/march`)
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].dates);
          arr2.push(res.data[a].views);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMarch(data);
      });
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/april`)
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].dates);
          arr2.push(res.data[a].views);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setApril(data);
      });
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/may`)
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].dates);
          arr2.push(res.data[a].views);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setMay(data);
      });
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/june`)
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].dates);
          arr2.push(res.data[a].views);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setJune(data);
      });
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/july`)
      .then(function (res) {
        var arr = [], arr2 = [];
        for (const a in res.data) {
          arr.push(res.data[a].dates);
          arr2.push(res.data[a].views);
        }

        data.labels = arr;
        data.datasets[0].data = arr2;
        setJuly(data);
      });
  }, []);

  return (
    <>
      <div className='header'>
        <h1 className='title'>Per Views</h1>
      </div>

      <Container>
        <Row>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">July</h5>
                <Bar data={july} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">June</h5>
                <Bar data={june} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">May</h5>
                <Bar data={may} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">April</h5>
                <Bar data={april} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} className="text-center">
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">March</h5>
                <Bar data={march} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default PieChart;