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

const getData = (res, edition) => {
    var arr = [], arr2 = [];
    for (const a in res.data) {
        console.log(res.data[a].edition)
        if (res.data[a].edition === edition) {
            arr.push(res.data[a].country);
            arr2.push(res.data[a].counts);
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
                <Pie data={data} />
            </Card.Body>
        </Card>
    </Col>
)

export default () => {
    console.log("yaya")
    const [march, setMarch] = useState([]);
    const [april, setApril] = useState([]);
    const [may, setMay] = useState([]);
    const [june, setJune] = useState([]);
    const [july, setJuly] = useState([]);
    const [august, setAugust] = useState([]);
    // console.log(process.env.REACT_APP_BASE_URL)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewscountrys/july`)
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
                <h1 className='title'>Per Countrys</h1>
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

// export default PieChart;