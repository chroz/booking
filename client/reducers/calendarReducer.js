import Rx from "rxjs";
import moment from 'moment';
import calendarActions from "../actions/calendarActions";

import { apiUrl } from '../config.json';
import { makeApi } from '../lib/utils';

const makeState = (state={}, date) => {
  return {
    ...state,
    dateObj: date,
    dateStr: moment(date).format('YYYY-MM-DD')
  };
};

const initialState = makeState({}, Date.now());

const calendarReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    calendarActions.selectDate.map(date => state => {
      // `Flatpickr` send dates in an array [https://github.com/chmln/flatpickr/issues/420]: Shed it!
      return makeState(state, Array.isArray(date) ? date.pop() : date)
    }),
    calendarActions.reset.map(() => state => initialState),
  );

export default calendarReducer$;