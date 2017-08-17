import Rx from "rxjs";
import moment from 'moment';
import axios from 'axios';
import calendarActions from "../actions/calendarActions";

import { apiUrl } from '../config.json';
import { makeApi } from '../lib/utils';

const initialState = {
  dateObj: Date.now(),
  dateStr: moment(Date.now()).format('YYYY-MM-DD'),
  bookings: {},
};

calendarActions.fetchBookings = calendarActions.fetchBookings
    .startWith("start_date,bt,2016-01-01,2016-02-01")
    .map(filter => `${apiUrl}/tbl_rooms?filter=${filter}`)
    .switchMap(url => Rx.Observable.fromPromise(axios.get(url)))
    .map(makeApi)
    .map(api => {
      // Group room-bookings by dates
      return api.rows.reduce((acc, cur) => {
        acc[cur.start_date] ? acc[cur.start_date].push(cur) : acc[cur.start_date] = [cur];
        return acc;
      }, {})
    });


const calendarReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    calendarActions.fetchBookings.map(bookings => state => {
      return {
        ...state,
        bookings: bookings
      };
    }),
    calendarActions.selectDate.map(date => state => {
      // `Flatpickr` send dates in an array [https://github.com/chmln/flatpickr/issues/420]: Shed it!
      date = Array.isArray(date) ? date.pop() : date;
      return {
        ...state,
        dateObj: date,
        dateStr: moment(date).format('YYYY-MM-DD'),
      };
    }),
    calendarActions.reset.map(() => state => initialState)
  );

export default calendarReducer$;