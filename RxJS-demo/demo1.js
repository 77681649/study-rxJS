'use strict';

var fetch = require('isomorphic-fetch')
var Rx = require('rx')
var Observable = Rx.Observable


const print = value => console.log(value)

console.log('Observable Operators : ')
console.log(Observable)

// reduce
Observable.range(1, 10)
	.filter(it => it % 2 === 0)
	.reduce((x, y) => x + y)
	.map(it => `[${it}]`)
	.subscribe(print)


// scan
Observable.range(1, 10)
	.filter(it => it % 2 === 0)
	.scan((x, y) => x + y)
	.map(it => `[${it}]`)
	.subscribe(print)

// interval

var a = Rx.Observable.interval(200).map(i => 'A' + i)
var b = Rx.Observable.interval(100).map(i => 'B' + i)

var subscribe = Rx.Observable.merge(a, b).subscribe((x) => console.log(x))


// 2秒后取消订阅
setTimeout(() => subscribe.dispose(), 2000)


// ajax
var fetchDouban = Rx.Observable.create((observer) => {
	console.log('create')

	fetch('http://www.douban.com')
		.then(function(response) {
			if (response.status >= 400) {
				observer.oNError(new Error("Bad response from server"))
			}

			return response.json()
		})
		.then((data) => {
			observer.onNext(data)
			observer.onComplete()
		})
})

fetchDouban.subscribe(
	print,
	print)