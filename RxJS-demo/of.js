'use strict'

const Rx = require('rx')
const Observable = Rx.Observable

let observable = Observable.of(1, 2, 3).map((it) => `number ${it}`)

observable.subscribe(
  (singal) => {
    console.log(singal)
  }
)