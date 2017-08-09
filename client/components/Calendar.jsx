import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';
import 'flatpickr/dist/l10n/no.js';

import { apiUrl } from '../lib/state';
import { makeApi } from '../lib/utils';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceId: props.serviceId,
      dates: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `${apiUrl}/tbl_rooms?filter=start_date,bt,2016-01-01,2016-02-01`,
      )
      .then(makeApi)
      .then(api => {
        // Group room-bookings by dates
        const dates = api.rows.reduce((acc, cur) => {
          acc[cur.start_date] ? acc[cur.start_date].push(cur) : acc[cur.start_date] = [cur];
          return acc;
        }, {})

        this.setState({dates});
      });
  }

  changeDate(date) {
    console.log(date);
  }

  render() {
    return (
      <div>
        <Flatpickr
          options={{
            clickOpens: false,
            dateFormat: 'Y-m-d',
            defaultDate: '2016-01-09',
            enable: [
              date => this.state.dates[moment(date).format('YYYY-MM-DD')]
            ],
            inline: true,
            //locale: 'no',
          }}
          onChange={this.changeDate}
        />
      </div>
    );
  }
}
