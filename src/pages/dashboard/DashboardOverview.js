
import React, { useState, useEffect } from "react";
import { Col, Row, Card } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { SalesValueWidget, SalesValueWidgetPhone } from "../../components/Widgets";

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
  const [views, setViews] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [traffics, setTraffics] = useState([]);
  const [viewThismonth, setViewThismonth] = useState(0);
  const [viewThisweek, setViewThisweek] = useState(0);
  const [viewThistoday, setViewThistoday] = useState(0);
  const [clickThismonth, setClickThismonth] = useState(0);
  const [clickThisweek, setClickThisweek] = useState(0);
  const [clickThistoday, setClickThistoday] = useState(0);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthismonth/june`)
      .then(function (res) {
        setViewThismonth(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthisweek/june`)
      .then(function (res) {
        setViewThisweek(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthistoday/june`)
      .then(function (res) {
        setViewThistoday(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthismonth/june`)
      .then(function (res) {
        setClickThismonth(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthisweek/june`)
      .then(function (res) {
        setClickThisweek(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/clickthistoday/june`)
      .then(function (res) {
        setClickThistoday(valueConversion(res.data[0].counts))
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/chart/colours/viewthismonth/july`)
      .then(function (res) {
        const str = res.data[0].counts || 0;
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

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Users"
            value={views}
            percentage={10.57}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View This Month</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{viewThismonth}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View This Week</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{viewThisweek}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>View Today</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{viewThistoday}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click This Month</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{clickThismonth}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click This Week</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{clickThisweek}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-3">
          <Card border="light" className="p-0">
            <Card.Body className="pb-3">
              <Card.Title>Click Today</Card.Title>
              <Card.Text className="text-gray mb-2"><h1>{clickThistoday}</h1></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </>
  );
};
