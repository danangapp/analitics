import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Row, Col, Container, Form, Button } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

const exportToExcel = (type, activeLabel, edition, data, globals = "") => {
  console.log("edition", edition);
  if (activeLabel) {
    const FileDownload = require('js-file-download');

    axios({
      url: `${process.env.REACT_APP_BASE_URL}/chartdetail`,
      method: 'POST',
      responseType: 'blob',
      data: {
        type,
        activeLabel,
        edition,
        dates: "2021-08-01",
        globals,
      }
    }).then((response) => {
      FileDownload(response.data, 'report.xlsx');
    });

  }
}

const viewChart = (edition, data, history) => {
  return (
    <Col key={edition}>
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
            onClick={(e) => { exportToExcel("browser", e.browser, e.edition, data) }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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
        {payload.browser}
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

const axiosData = (months, setData) => {
  axios.post(`${process.env.REACT_APP_BASE_URL}/chart3`, {
    app: "colours",
    action: "viewsbrowsers",
    months: months
  })
    .then(function (res) {
      setData(current => {
        return ({
          ...current,
          ["march"]: getData(res, "march"),
          ["april"]: getData(res, "april"),
          ["may"]: getData(res, "may"),
          ["june"]: getData(res, "june"),
          ["july"]: getData(res, "july"),
          ["august"]: getData(res, "august"),
          ["months"]: months,
        })
      });
    });
}

export default () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axiosData("2021-08-01", setData)
  }, []);

  var editionName = ['August', 'July', 'June', 'May', 'April', 'March'];
  var editionData = [data.august || [], data.july || [], data.june || [], data.may || [], data.april || [], data.march || []];
  if (data.months == "2021-07-01") {
    editionName.shift();
    editionData.shift();
  }
  if (data.months == "2021-06-01") {
    editionName.shift();
    editionData.shift();
    editionName.shift();
    editionData.shift();
  }

  return (
    <>
      <div className='header'>
        <h1 className='title'>Browser</h1>
      </div>

      <Form.Group>
        <Form.Label>Month</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => axiosData(e.target.value, setData)} style={{ width: 200 }}>
          <option value="2021-08-01">August</option>
          <option value="2021-07-01">July</option>
          <option value="2021-06-01">June</option>
        </Form.Select>
        <Button variant="primary" onClick={() => console.log("e")}>Export All</Button>
      </Form.Group>
      <Container>
        {
          editionData ?
            editionName.map((a, b) =>
              viewChart(a, editionData[b], history)
            )
            : null
        }
      </Container >
    </>
  )
};