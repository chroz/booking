import React, { Component } from "react";
import moment from 'moment';
import PropTypes from "prop-types";
import { get } from "dot-prop";
import { connect, makeSelector } from "../state/RxState";
import bookingActions from "../actions/bookingActions";

import Calendar from './Calendar.jsx';

export const Booking = ({ selectedDate, fetchBookings, reset }) => (
  <div>
    <h1>{moment(selectedDate).format('YYYY-MM-DD')}</h1>
    <Calendar />
  </div>
);

Booking.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
};

const selector = state => ({
  selectedDate: get(state, "calendar.selectedDate")
});

export default connect(selector, bookingActions)(Booking);

<Calendar />