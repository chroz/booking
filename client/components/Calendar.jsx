import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "../state/RxState";
import calendarActions from "../actions/calendarActions";

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import 'flatpickr/dist/l10n/no.js';


export const Calendar = ({ state, selectDate, reset }) => (
  <div>
    <h1>{state.dateStr}</h1>
    <Flatpickr
      options={{
        clickOpens: false,
        dateFormat: 'Y-m-d',
        // enable: [
        //   date => fetchbookings.dates[moment(date).format('YYYY-MM-DD')]
        // ],
        inline: true,
        //locale: 'no',
      }}
      value={state.dateObj}
      onChange={selectDate}
    />
    <button onClick={reset} id="reset">Reset</button>
  </div>
);

Calendar.propTypes = {
  state: PropTypes.object.isRequired,
  selectDate: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect({actionSubjects: calendarActions})(Calendar);