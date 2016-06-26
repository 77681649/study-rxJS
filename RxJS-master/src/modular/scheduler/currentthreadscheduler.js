'use strict';

var Scheduler = require('../scheduler');
var ScheduledItem = require('./scheduleditem');
var PriorityQueue = require('../internal/priorityqueue');
var tryCatchUtils = require('../internal/trycatchutils');
var tryCatch = tryCatchUtils.tryCatch, errorObj = tryCatchUtils.errorObj, thrower = tryCatchUtils.thrower;
var inherits = require('inherits');

/**
 * 同步调度器
 * 在当前线程直接执行 , 会阻塞线程
 */
function CurrentThreadScheduler() {
  Scheduler.call(this);
}

CurrentThreadScheduler.queue = null;

inherits(CurrentThreadScheduler, Scheduler);

/**
 * 运行弹射器
 */
function runTrampoline () {
  while (CurrentThreadScheduler.queue.length > 0) {
    var item = CurrentThreadScheduler.queue.dequeue();
    !item.isCancelled() && item.invoke();
  }
}

/**
 * 调度
 * @param {} state
 * @param {} action
 */
CurrentThreadScheduler.prototype.schedule = function (state, action) {
  var si = new ScheduledItem(this, state, action, this.now());

  if (!CurrentThreadScheduler.queue) {
    CurrentThreadScheduler.queue = new PriorityQueue(4);
    CurrentThreadScheduler.queue.enqueue(si);

    var result = tryCatch(runTrampoline)();
    CurrentThreadScheduler.queue = null;
    if (result === errorObj) { thrower(result.e); }
  } else {
    CurrentThreadScheduler.queue.enqueue(si);
  }
  return si.disposable;
};

CurrentThreadScheduler.prototype.scheduleRequired = function () { return !CurrentThreadScheduler.queue; };

module.exports = CurrentThreadScheduler;
