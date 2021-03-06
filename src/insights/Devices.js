import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Row, Col, Container } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import moment from 'moment';

const viewChart = (edition, data, history) => {
  const navigateTo = (e) => history.push({
    pathname: '../detail/custom-report',
    state: {
      fromDate: moment().startOf('month').format('YYYY-MM-DD'),
      untilDate: moment().endOf('month').format('YYYY-MM-DD'),
      edition: edition,
      selected: e,
      check: "device"
    },
  });

  return (
    <Col>
      <h3 className="text-center">{edition}</h3>
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
            onClick={(e) => { navigateTo(e) }}
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
}

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
        {payload.devices}
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#fe0088', '#00fef5'];

export default () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewsdevices/july`)
      .then(function (res) {
        const arr = [];
        for (let i = moment().startOf('month').format('M'); i > 2; i--) {
          const monthName = moment(`2021-${i}-1`).startOf('month').format('MMMM');
          arr.push(
            { month: monthName, data: getData(res, monthName.toLowerCase()) }
          );
        }

        setData(current => {
          return ({ ...current, ["dataPerMonth"]: arr })
        })
      });
  }, []);
  return (
    <>
      <div className='header'>
        <h1 className='title'>Device</h1>
      </div>

      <Container>
        {data.dataPerMonth && data.dataPerMonth.map((a, b) => viewChart(a.month, a.data))}
      </Container>
    </>
  )
};