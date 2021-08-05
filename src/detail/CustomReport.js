import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
var DataTable = require('react-data-components').DataTable;

var column = [
  { title: 'No', prop: 'id' },
  { title: 'Ip', prop: 'ip' },
  { title: 'Device', prop: 'device' },
  { title: 'Duration', prop: 'period' },
  { title: 'Page', prop: 'page' },
  { title: 'Edition', prop: 'edition' },
  { title: 'Size', prop: 'size' },
  { title: 'Country', prop: 'country' }
];

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  var columns;
  const location = useLocation();

  useEffect(() => {
    generateTable();
  }, []);

  const generateTable = () => {
    var selected;
    console.log(location.state);
    if (location.state.check == "browser") {
      selected = location.state.selected.browser
    } else if (location.state.check == "device") {
      selected = location.state.selected.devices
    } else if (location.state.check == "pagename") {
      selected = location.state.selected.page_name
    } else if (location.state.check == "view") {
      selected = location.state.selected.view
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/customreport/`, {
      "edition": location.state.edition || "august",
      "startdate": location.state.fromDate || "2021-08-01",
      "enddate": location.state.endDate || "2021-08-31",
      "select": selected || "mobile",
      "check": location.state.check,
    })
      .then(function (res) {
        setData(res.data);
      });
  }

  const reports = () => {
    const FileDownload = require('js-file-download');

    axios({
      url: `${process.env.REACT_APP_BASE_URL}/report/colours/${menu}/july/${moment(startDate).format('yyyy-MM-D')}/${moment(endDate).format('yyyy-MM-D')}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'report.xlsx');
    });

  }

  return (
    <>
      <div className='header'>
        <DataTable
          keys="no"
          columns={column || []}
          initialData={data}
          initialPageLength={5}
          initialSortBy={{ order: 'descending' }}
        />
      </div>

    </>
  )
};
