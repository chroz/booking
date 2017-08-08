import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';
import 'flatpickr/dist/l10n/no.js';

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
        'http://localhost:8100/api.php/tbl_rooms?filter=start_date,bt,2016-01-01,2016-02-01',
      )
      .then(res => {
        let temp = res.data.tbl_rooms.records;
        let dates = [];

        for (var i = 0; i < temp.length; i++) {
          let room = temp[i];
          let id = room[0];
          let date = room[2];
          let service_id = room[4];
          let time = room[5];
          if (!dates[date]) {
            dates[date] = [];
          }
          dates[date].push({id, service_id, time});
        }
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
            defaultDate: '2016-01-01',
            enable: [
              date => {
                let dates = this.state.dates;
                let m = moment(date).format('YYYY-MM-DD');

                if (!dates[m]) return false;
                return true;
                // Sort by active service
                for (var i = 0; i < dates.length; i++) {
                  let d = dates[i];
                  return d.serviceId == this.state.serviceId;
                }
              },
            ],
            inline: true,
            locale: 'no',
          }}
          onChange={this.changeDate}
        />
      </div>
    );
  }
}
