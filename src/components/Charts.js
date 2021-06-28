
import React, { useState } from "react";
import Chartist from "react-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import axios from 'axios';


export const SalesValueChart = () => {
  const [data, setData] = useState([]);
  axios.get(`${process.env.REACT_APP_BASE_URL}/colours/viewsapp/june`)
    .then(function (res) {
      var arr1 = [], arr2 = [], arr3 = [];
      const resData = res.data || [];
      for (const a in resData) {
        arr1.push(resData[a].dates || []);
        arr2.push(resData[a].views || []);
      }
      arr3.push(arr2);
      data.labels = arr1;
      data.series = arr3;
      setData(data)
    });

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
  );
};

export const SalesValueChartJune = () => {
  const [data, setData] = useState([]);
  axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/june`)
    .then(function (res) {
      var arr1 = [], arr2 = [], arr3 = [];
      const resData = res.data || [];
      for (const a in resData) {
        arr1.push(resData[a].dates || []);
        arr2.push(resData[a].views || []);
      }
      arr3.push(arr2);
      data.labels = arr1;
      data.series = arr3;
      setData(data)
    });

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
  );
};

export const SalesValueChartMay = () => {
  const [data, setData] = useState([]);
  axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/may`)
    .then(function (res) {
      var arr1 = [], arr2 = [], arr3 = [];
      const resData = res.data || [];
      for (const a in resData) {
        arr1.push(resData[a].dates || []);
        arr2.push(resData[a].views || []);
      }
      arr3.push(arr2);
      data.labels = arr1;
      data.series = arr3;
      setData(data)
    });

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
  );
};

export const SalesValueChartApril = () => {
  const [data, setData] = useState([]);
  axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/april`)
    .then(function (res) {
      console.log("danang data", res.data);
      var arr1 = [], arr2 = [], arr3 = [];
      const resData = res.data || [];
      for (const a in resData) {
        arr1.push(resData[a].dates || []);
        arr2.push(resData[a].views || []);
      }
      arr3.push(arr2);
      data.labels = arr1;
      data.series = arr3;
      setData(data)
    });

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
  );
};

export const SalesValueChartMarch = () => {
  const [data, setData] = useState([]);
  axios.get(`${process.env.REACT_APP_BASE_URL}/colours/views/march`)
    .then(function (res) {
      var arr1 = [], arr2 = [], arr3 = [];
      const resData = res.data || [];
      for (const a in resData) {
        arr1.push(resData[a].dates || []);
        arr2.push(resData[a].views || []);
      }
      arr3.push(arr2);
      data.labels = arr1;
      data.series = arr3;
      setData(data)
    });

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
  );
};

export const SalesValueChartphone = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [[1, 2, 2, 3, 3, 4, 3]]
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: false,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-major-tenth" />
  );
};

export const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: value => `${Math.round(value / series.reduce(sum) * 100)}%`,
  }

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={{ series }} options={{ ...options, plugins }} type="Pie" className="ct-golden-section" />
  );
};

export const BarChart = (props) => {
  const { labels = [], series = [], chartClassName = "ct-golden-section" } = props;
  const data = { labels, series };

  const options = {
    low: 0,
    showArea: true,
    axisX: {
      position: 'end'
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{ ...options, plugins }} type="Bar" className={chartClassName} />
  );
};
