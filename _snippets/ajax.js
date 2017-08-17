var Rx = require("rxjs")

action = new Rx.Subject()

action = action
    .do(x => console.log('url', x))
    .switchMap(url => Rx.Observable.fromPromise(fetch(url)))
    .do(x => console.log(x))
    // .map(xhr => xhr.response)
    // //.map(makeApi)
    // .do(x => console.log('', x))


action.subscribe(x => console.log('subscriber', x))
action.next('http://intergate.io')

console.log("==========")

module.exports = action