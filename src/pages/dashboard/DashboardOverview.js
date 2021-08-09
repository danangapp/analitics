
import React, { useState, useEffect } from "react";
import { Col, Row, Card } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';


const gradientOffset = (data) => {
  if (data) {
    const dataMax = Math.max(...data.map((i) => i.views));
    const dataMin = Math.min(...data.map((i) => i.views));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  }
};

const CustomizedAxisTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
}

const viewChart = (edition, data) => {
  const navigateTo = (e) => {
    console.log(e)
  }

  return (
    <Col>
      <h3 className="text-center">All Edition In This Month</h3>
      <ResponsiveContainer width={'100%'} height={400}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          onClick={(e) => { navigateTo(e) }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dates" tick={<CustomizedAxisTick />} height={80} />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset(data)} stopColor="green" stopOpacity={1} />
              <stop offset={gradientOffset(data)} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="views" stroke="#000" fill="url(#splitColor)" label={{ position: 'top' }} />
        </AreaChart>
      </ResponsiveContainer>
    </Col>
  )
}


const valueConversion = (value) => {
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthismonth/june`)
      .then(function (res) {
        const strings = "ViewThismonth";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthisweek/june`)
      .then(function (res) {
        const strings = "ViewThisweek";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthistoday/june`)
      .then(function (res) {
        const strings = "ViewThistoday";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthismonth/june`)
      .then(function (res) {
        const strings = "ClickThismonth";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthisweek/june`)
      .then(function (res) {
        const strings = "ClickThisweek";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthistoday/june`)
      .then(function (res) {
        const strings = "ClickThistoday";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(res.data[0].counts) })
        })
      });


    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/views2/august`)
      .then(function (res) {
        const strings = "data";

        setData(current => {
          return ({ ...current, [strings]: res.data })
        })
      });
  }, []);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          {viewChart("August", data.data)}
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View This Month</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ViewThismonth}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View This Week</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ViewThisweek}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View Today</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ViewThistoday}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click This Month</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ClickThismonth}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click This Week</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ClickThisweek}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click Today</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{data.ClickThistoday}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
