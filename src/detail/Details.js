import React, { useState, useEffect } from 'react';
import { Form, Button } from '@themesberg/react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
var DataTable = require('react-data-components').DataTable;

var columnBrowsers = [
  { title: 'No', prop: 'no' },
  { title: 'Browser', prop: 'browser' },
  { title: 'Count', prop: 'counts' }
];

var columnCountrys = [
  { title: 'No', prop: 'no' },
  { title: 'Country', prop: 'country' },
  { title: 'Count', prop: 'counts' }
];

var columnDevices = [
  { title: 'No', prop: 'no' },
  { title: 'Device', prop: 'devices' },
  { title: 'Count', prop: 'counts' }
];

var columnSizes = [
  { title: 'No', prop: 'no' },
  { title: 'Size', prop: 'sizes' },
  { title: 'Count', prop: 'counts' }
];

var columnPages = [
  { title: 'No', prop: 'no' },
  { title: 'Page', prop: 'page' },
  { title: 'Count', prop: 'clicks' }
];

var columnPageName = [
  { title: 'No', prop: 'no' },
  { title: 'PageName', prop: 'pagename' },
  { title: 'Count', prop: 'counts' }
];

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  var columns;

  const startApps = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/detail/colours/${menu}/july/${moment(startDate).format('yyyy-MM-D')}/${moment(endDate).format('yyyy-MM-D')}`)
      .then(function (res) {
        setData(res.data);
      });
  }

  const reports = () => {
    // var url = window.URL.createObjectURL(blob)
    // var a = document.createElement('a')
    // a.href = url
    // a.download = fileName + type
    // document.body.appendChild(a)
    // a.click()
    // a.remove()
    axios.get(`${process.env.REACT_APP_BASE_URL}/report/colours/${menu}/july/${moment(startDate).format('yyyy-MM-D')}/${moment(endDate).format('yyyy-MM-D')}`)
      .then(function (res) {
        // var url = window.URL.createObjectURL(res.data)
        const url = window.URL.createObjectURL(
          new Blob([res]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = "danang.xlsx"
        // link.setAttribute(
        //   'download',
        //   `danang.xlsx`,
        // );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();
        link.remove();

        // var a = document.createElement('a')
        // a.href = url
        // a.download = "danang.xlsx"
        // document.body.appendChild(a)
        // a.click()
        // a.remove()
      });
  }

  const handleClick = (e) => {
    if (e === "submit")
      startApps();
    else
      reports();
  }

  const onMenu = (event) => {
    setMenu(event.target.value);
  }

  if (menu === "viewsbrowsersdetail") {
    columns = columnBrowsers;
  } else if (menu === "viewscountrysdetail") {
    columns = columnCountrys;
  } else if (menu === "viewsdevicesdetail") {
    columns = columnDevices;
  } else if (menu === "viewspagesdetail") {
    columns = columnPages;
  } else if (menu === "viewspagenamesdetail") {
    columns = columnPageName;
  } else if (menu === "viewssizesdetail") {
    columns = columnSizes;
  }

  return (
    <>
      <div className='header'>
        <h1 className='title'>Browser Detail</h1>
        <Form.Select aria-label="Default select example" onChange={(event) => onMenu(event)}>
          <option>Menu</option>
          <option value="viewsbrowsersdetail">Browser</option>
          <option value="viewscountrysdetail">Country</option>
          <option value="viewsdevicesdetail">Device</option>
          <option value="viewsdurationsdetail">Duration</option>
          <option value="viewspagesdetail">Pages</option>
          <option value="viewspagenamesdetail">Page Name</option>
          <option value="viewssizesdetail">Size</option>
          <option value="viewsdetail">Detail</option>
        </Form.Select>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <Button variant="primary" onClick={() => handleClick("submit")}>Submit</Button>
        <Button variant="primary" onClick={() => handleClick("export")}>Export</Button>
        <DataTable
          keys="no"
          columns={columns || []}
          initialData={data}
          initialPageLength={5}
          initialSortBy={{ order: 'descending' }}
        />
      </div>

    </>
  )
};

// export default PieChart;