
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidgetMarch, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { PageVisitsTable } from "../components/Tables";
import { trafficShares, totalOrders } from "../data/charts";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import moment from 'moment';

const exportToExcel = (e) => {
  if (e && e.activeLabel) {
    const dates = moment().format('YYYY-MM-') + e.activeLabel;
    const FileDownload = require('js-file-download');

    axios({
      url: `${process.env.REACT_APP_BASE_URL}/detailedition/${moment(dates).format('YYYY-MM-DD')}/march`,
      method: 'GET',
      responseType: 'blob',
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
        onClick={(e) => { exportToExcel(e) }}
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

const valueConversion = (value) => {
  var suffixes = ["", "k", "m", "b", "t"];
  console.log("danang str", value);
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
    console.log("danang env", process.env.REACT_APP_BASE_URL)
    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewscount/march`)
      .then(function (res) {
        const str = res.data[0].views || 0;
        const strings = "views";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(str) })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickscount/march`)
      .then(function (res) {
        const str = res.data[0].views || 0;
        const strings = "clicks";
        setData(current => {
          return ({ ...current, [strings]: valueConversion(str) })
        })
      });


    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewsdevices/march`)
      .then(function (res) {
        var counts = 0;
        for (var a in res.data) {
          counts = counts + res.data[a].counts;
        }

        var obj = {}, arr = [], id = 0;
        for (var a in res.data) {
          id++;
          obj = {};
          obj.id = id;
          obj.label = res.data[a].devices;
          obj.value = Math.round(res.data[a].counts / counts * 100);
          obj.color = "primary";
          obj.icon = "faDesktop";
          arr.push(obj);
        }

        const strings = "traffics";
        setData(current => {
          return ({ ...current, [strings]: arr })
        })
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/views/march`)
      .then(function (res) {
        var arr1 = [], arr2 = [], arr3 = [];
        const resData = res.data || [];
        for (const a in resData) {
          if (resData[a].edition === "march") {
            arr1.push(resData[a]);
          }
        }

        const strings = "data";
        setData(current => {
          return ({ ...current, [strings]: arr1 })
        })
      });

  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          {viewChart("March", data.data)}
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <Row>
            <Col xs={12} className="mb-4">
              <CounterWidget
                category="Clicks"
                title={data.clicks}
                period="Feb 1 - Apr 1"
                percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
                className="mb-4"
              />
            </Col>
            <Col xs={12} className="mb-4">
              <PageVisitsTable app="colours" edition="march" />
            </Col>
          </Row>

        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={data.traffics} />
        </Col>
      </Row>

    </>
  );
};
