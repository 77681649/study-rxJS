'use strict';

const Rx = require('rx')
const Observable = Rx.Observable


const observable = Observable.create((observer) => {
	let count = 0

	setInterval(() => {

		if (count > 10) {
			observer.onCompleted()
		}

		observer.onNext(++count, 0)
	}, 500)
})

setTimeout(function() {
	observable.subscribe(
		(signal) => {
			console.log(signal)
		},
		(err) => {
			console.log(err)
		},
		(signal) => {
			console.log(signal)
		}
	)
}, 5000)