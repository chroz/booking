import React, { Component } from "react";
import moment from 'moment';
import PropTypes from "prop-types";
import { get } from "dot-prop";
import { connect, makeSelector } from "../state/RxState";
import calendarActions from "../actions/calendarActions";

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import 'flatpickr/dist/l10n/no.js';


export const Calendar = ({ selectedDate, bookings, selectDate, reset }) => (
  <div>
    <Flatpickr
      options={{
        clickOpens: false,
        dateFormat: 'Y-m-d',
        defaultDate: selectedDate,
        enable: [
          date => bookings[moment(date).format('YYYY-MM-DD')]
        ],
        inline: true,
        //locale: 'no',
      }}
      value={selectedDate}
      onChange={selectDate}
    />
    <button onClick={reset} id="reset">Reset</button>
  </div>
);

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  selectDate: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const selector = state => ({
  selectedDate: get(state, "calendar.selectedDate"),
  bookings: get(state, "booking.bookings")
});

export default connect(selector, calendarActions)(Calendar);