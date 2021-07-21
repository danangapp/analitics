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

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  var columns;

  const startApps = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/colours/${menu}/july/${moment(startDate).format('yyyy-MM-D')}/${moment(endDate).format('yyyy-MM-D')}`)
      .then(function (res) {
        // console.log(res.data[0]);
        setData(res.data[0]);
      });
  }

  useEffect(() => {
    startApps();
  }, []);

  const handleClick = () => {
    startApps();
  }

  const onMenu = (event) => {
    setMenu(event.target.value);
  }

  if (menu == "viewsbrowsersdetail") {
    columns = columnBrowsers;
  } else if (menu == "viewscountrysdetail") {
    columns = columnCountrys;
  }
  console.log(menu)

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
        <Button variant="primary" onClick={() => handleClick()}>Submit</Button>
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