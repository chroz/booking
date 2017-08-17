import Rx from "rxjs";
import moment from 'moment';
import calendarActions from "../actions/calendarActions";

const initialState = {
  selectedDate: new Date(),
};

const calendarReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    calendarActions.selectDate.map(date => state => {
      // `Flatpickr` send dates in an array [https://github.com/chmln/flatpickr/issues/420]: Shed it!
      date = Array.isArray(date) ? date.pop() : date;
      return {
        ...state,
        selectedDate: date,
      };
    }),
    calendarActions.reset.map(() => state => initialState)
  );

export default calendarReducer$;