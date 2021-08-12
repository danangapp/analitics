
import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import moment from 'moment';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const axiosData = (months, edition, setData, options = "", value = "") => {
  axios.request({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/chart2/views2`,
    data: {
      months,
      edition,
      action: "views2",
    }
  }).then(function (res) {
    setData(current => {
      if (options == "") {
        return ({ ...current, ["data"]: res.data })
      } else {
        if (options == "edition") {
          return ({ ...current, ["data"]: res.data, ["edition"]: value });
        } else {
          return ({ ...current, ["data"]: res.data, ["months"]: value });
        }
      }
    })
  });
}

const ambilData = (value, setData, data, options) => {
  var edition, months;
  if (options == "edition") {
    edition = value;
    months = data.months;
  } else {
    edition = data.edition;
    months = value;
  }

  axiosData(months, edition, setData, options, value);
}


const exportToExcel = (activeLabel, data, globals = "") => {
  if (activeLabel) {
    const dates = moment(data.months).format('YYYY-MM-') + activeLabel;
    const FileDownload = require('js-file-download');

    axios({
      url: `${process.env.REACT_APP_BASE_URL}/reportdetail`,
      method: 'POST',
      responseType: 'blob',
      data: {
        dates: moment(dates).format('YYYY-MM-DD'),
        edition: data.edition || "all",
        globals,
      }
    }).then((response) => {
      FileDownload(response.data, 'report.xlsx');
    });

  }
}

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

const onDateChanges = (activeLabel, data, setData) => {
  setData(current => {
    return ({ ...current, ["dates2"]: activeLabel })
  })
  exportToExcel(activeLabel, data)
}

const viewChart = (edition, result, setData) => {
  const handleClick = () => {
    exportToExcel(result.dates2, result, "-");
  };

  return (
    <Col>
      <h3 className="text-center">{edition && capitalizeFirstLetter(edition)} Edition In {moment(result.months).format('MMMM')}</h3>
      <Form.Group>
        <Form.Label>Edition</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => ambilData(e.target.value, setData, result, "edition")} style={{ width: 200 }}>
          <option value="all">All Edition</option>
          <option value="august">August</option>
          <option value="july">July</option>
          <option value="june">June</option>
          <option value="may">May</option>
          <option value="april">April</option>
          <option value="march">March</option>
        </Form.Select>
        <Form.Label>Month</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => ambilData(e.target.value, setData, result, "months")} style={{ width: 200 }}>
          <option value="2021-08-01">August</option>
          <option value="2021-07-01">July</option>
          <option value="2021-06-01">June</option>
        </Form.Select>
        <Button variant="primary" onClick={() => handleClick()}>Export All</Button>
      </Form.Group>
      <ResponsiveContainer width={'100%'} height={400}>
        <AreaChart
          width={500}
          height={400}
          data={result.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          onClick={(e) => { onDateChanges(e.activeLabel, result, setData) }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dates" tick={<CustomizedAxisTick />} height={80} />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset(result.data)} stopColor="green" stopOpacity={1} />
              <stop offset={gradientOffset(result.data)} stopColor="red" stopOpacity={1} />
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

    const months = "2021-08-01";
    const edition = "all";
    setData(current => {
      return ({ ...current, ["months"]: months, ["edition"]: edition, ["dates2"]: months })
    })
    axiosData(months, edition, setData);

  }, []);


  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          {viewChart(data.edition, data, setData)}
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


