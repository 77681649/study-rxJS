/**
 * observable create
 */

'use strict'

const Rx = require('rx')
const Observable = Rx.Observable

let observable = Observable.create((observer) => {
  let timer = setInterval(() => {
    observer.onNext(40)
  }, 1000)

  // 返回一个disposer
  return function(){
    clearInterval(timer)
  }
})

let subscription = observable.subscribe(
  (signal) => {
    console.log(signal)
  },
  (error) => {
    console.log('error')
  },
  () => {
    console.log('completed')
  }
)

setTimeout(() => {
  subscription.dispose()
}, 3000)

