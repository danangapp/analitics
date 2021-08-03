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
  const [august, setAugust] = useState([]);

  const getData = (res, edition) => {
    var arr = [], arr2 = [];
    for (const a in res.data) {
      if (res.data[a].edition === edition) {
        arr.push(res.data[a].dates);
        arr2.push(res.data[a].views);
      }
    }

    data.labels = arr;
    data.datasets[0].data = arr2;
    return data
  }

  const viewChart = (edition, data) => (
    <Col xs={6} className="text-center">
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">{edition}</h5>
          <Bar data={data} options={options} />
        </Card.Body>
      </Card>
    </Col>
  )



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/views/march`)
      .then(function (res) {
        setMarch(getData(res, "march"));
        setApril(getData(res, "april"));
        setMay(getData(res, "may"));
        setJune(getData(res, "june"));
        setJuly(getData(res, "july"));
        setAugust(getData(res, "august"));
      });
  }, []);

  return (
    <>
      <div className='header'>
        <h1 className='title'>Per Views</h1>
      </div>

      <Container>
        <Row>
          {viewChart("August", august)}
          {viewChart("July", july)}
          {viewChart("June", june)}
          {viewChart("May", may)}
          {viewChart("April", april)}
          {viewChart("March", march)}
        </Row>
      </Container>
    </>
  )
};

export default PieChart;