import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Row, Col, Container } from '@themesberg/react-bootstrap';
import axios from 'axios';

const viewChart = (edition, data) => (
  <Col>
    <h3>{edition}</h3>
    <ResponsiveContainer width={'100%'} height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="counts"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label={renderLabel}
          onClick={(e) => { console.log(e.value) }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Legend verticalAlign="top" height={36} /> */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Col>
)

const RADIAN = Math.PI / 180;
let renderLabel = function (props) {
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        style={{ fontWeight: "bold" }}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
      >
        {payload.page_name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {value}
      </text>
    </g>
  );
}

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

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewspagenames/july`)
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
        <h1 className='title'>Per PageName</h1>
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