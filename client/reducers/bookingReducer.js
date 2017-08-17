import Rx from "rxjs";
import moment from 'moment';
import axios from 'axios';
import bookingActions from "../actions/bookingActions";

import { apiUrl } from '../config.json';
import { makeApi } from '../lib/utils';

const initialState = {
  bookings: {},
};

// TODO! Make this work without replacing `bookingActions.fetchBookings`
bookingActions.fetchBookings = bookingActions.fetchBookings
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


const bookingReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    bookingActions.fetchBookings.map(bookings => state => {
      return {
        ...state,
        bookings: bookings
      };
    }),
  );

export default bookingReducer$;