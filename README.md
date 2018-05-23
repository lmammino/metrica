# process-metrics

[![npm version](https://badge.fury.io/js/process-metrics.svg)](http://badge.fury.io/js/process-metrics)
[![CircleCI](https://circleci.com/gh/lmammino/process-metrics.svg?style=shield)](https://circleci.com/gh/lmammino/process-metrics)
[![codecov.io](https://codecov.io/gh/lmammino/process-metrics/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/process-metrics)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Event Emitter based node library that emits process metrics (uptime, memory, cpu) at given intervals


## Install & quick usage

**Requirements**: this library is written for Node.js >= 6.0

As usual, this happens through NPM:

```bash
npm install --save process-metrics
```

Then, in your code:

```javascript
const metrics = require('process-metrics')()
// metrics is an event emitter

metrics.on('tick', (data) => console.log(data))
// tick happens (by default) every minute and data will look like:
// {
//   cpu: {
//     user: 129255,
//     system: 25515
//   },
//   memory: {
//     rss: 21843968,
//     heapTotal: 8208384,
//     heapUsed: 5394352,
//     external: 8628
//   },
//   uptime: 44.858
// }
```


## 🤔 Rationale

When running your Node.js app in production you might be interested in gathering metrics
about the running process. Perhaps, you want to log this information or send it to
a centralized metrics system.

This library gives you an easy way to collect process metric continuously and offers
a convenient event based interface so that you can easily attach your custom logic
to handle the new metrics.


## Options

When instantiating a new process metrics you can specify some options:

interval: 60000,
autoStart: true

  - `interval` (default `60000`) - Allows you to specify how often the metrics are collected.
    This can be a number (milliseconds) or a string expression as supported by the [`ms` module](http://npm.im/ms)
  - `autoStart` (default `true`) - Will automatically start the collection of metrics at given intervals. If set to `false`
    you should start the collection with the `.start()` method

## Methods

A process metrics instance will expose few methods:

  - `.start()` - Will start the automatic collection of metrics (which will trigger `tick` events at given intervals)
  - `.stop()` - Will stop the automatic collection of metrics
  - `.getMetrics()` - Will get and return the current metrics. It's not going to trigger a `tick` event.

## Events

A process metrics instance is an event emitter and will emit the following events:

  - `tick` - triggered continuously at the given interval time. It will contain as a payload the
    current metrics object.


## Complete example

This example will collect and log metrics for 5 seconds and then stop the collection:

```javascript
const ProcessMetrics = require('process-metrics')
const pm = ProcessMetrics({ interval: '1s', autoStart: false })
pm.on('tick', (metrics) => console.log('Tick:', metrics))
setTimeout(() => pm.stop(), 5000)
pm.start()
```


## 👯‍ Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/process-metrics/issues).


## 🤦‍ License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
