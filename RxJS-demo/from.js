'use strict'

const Rx = require('rx')
const Observable = Rx.Observable

let onNext = signal => console.log(signal)

// array
Observable.from([1, 2, 3, 4, 5]).subscribe(onNext)

// string
Observable.from('ABCD').subscribe(onNext)

// like-array
let likeArray = { 0: 1, 1: 2, length: 3 }
Observable.from(likeArray).subscribe(onNext)

// map
Observable.from(
  [1, 2, 3, 4],
  (v, k) => {
    console.log('map', v)

    return v * 2
  }
).subscribe(onNext)
