import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Row, Col, Container } from '@themesberg/react-bootstrap';
import axios from 'axios';


const gradientOffset = (data) => {
  const dataMax = Math.max(...data.map((i) => i.counts));
  const dataMin = Math.min(...data.map((i) => i.counts));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
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

const viewChart = (edition, data) => (
  <Col>
    <h3 className="text-center">{edition}</h3>
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="durations" tick={<CustomizedAxisTick />} height={80} />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={gradientOffset(data)} stopColor="green" stopOpacity={1} />
            <stop offset={gradientOffset(data)} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="counts" stroke="#000" fill="url(#splitColor)" label={{ position: 'top' }} />
      </AreaChart>
    </ResponsiveContainer>
  </Col>
)

const RADIAN = Math.PI / 180;

const getData = (res, edition) => {
  var arr = [];
  for (const a in res.data) {
    if (res.data[a].edition === edition) {
      arr.push(res.data[a]);
    }
  }

  return arr;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default () => {
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewsdurations/july`)
      .then(function (res) {
        setMarch(getData(res, "march"));
        setApril(getData(res, "april"));
        setMay(getData(res, "may"));
        setJune(getData(res, "june"));
        setJuly(getData(res, "july"));
        setAugust(getData(res, "august"));
      });
  }, []);
  console.log(august);
  return (
    <>
      <div className='header'>
        <h1 className='title'>Durations</h1>
      </div>

      <Container>
        {viewChart("August", august)}
        {viewChart("July", july)}
        {viewChart("June", june)}
        {viewChart("May", may)}
        {viewChart("April", april)}
        {viewChart("March", march)}
      </Container>
    </>
  )
};