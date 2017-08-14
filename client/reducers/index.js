import Rx from "rxjs";
import calendarReducer$ from "../reducers/calendarReducer";

const reducer$ = Rx.Observable.merge(
  calendarReducer$.map(reducer => ["state", reducer]),
);

export default reducer$;
