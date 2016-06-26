'use strict'

const Rx = require('rx')
const Subject = Rx.Subject

// 最简单的一个Subject
let subject = new Subject()

subject.subscribe(
  (signal)=>{
    console.log(signal)
  },
  null,
  ()=>{
    console.log('completed')
  }
)

subject.onNext(100)
subject.onCompleted()
