
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';

import { CounterWidget, CircleChartWidget, SalesValueWidgetJune, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { PageVisitsTable } from "../components/Tables";
import { trafficShares, totalOrders } from "../data/charts";

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
  const [views, setViews] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [traffics, setTraffics] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewscount/june`)
      .then(function (res) {
        const str = res.data[0].views || 0;
        setViews(valueConversion(str))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickscount/june`)
      .then(function (res) {
        const str = res.data[0].views || 0;
        setClicks(valueConversion(str))
      });


    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewsdevices/june`)
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

        setTraffics(arr);
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
          <SalesValueWidgetJune
            title="Users"
            value={views}
            percentage={10.57}
          />
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
                title={clicks}
                period="Feb 1 - Apr 1"
                percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
                className="mb-4"
              />
            </Col>
            <Col xs={12} className="mb-4">
              <PageVisitsTable app="colours" edition="june" />
            </Col>
          </Row>

        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={traffics} />
        </Col>
      </Row>

    </>
  );
};
