import Rx from "rxjs";
import calendarReducer$ from "../reducers/calendarReducer";
import bookingReducer$ from "../reducers/bookingReducer";

const reducer$ = Rx.Observable.merge(
  calendarReducer$.map(reducer => ["calendar", reducer]),
  bookingReducer$.map(reducer => ["booking", reducer]),
);

export default reducer$;
