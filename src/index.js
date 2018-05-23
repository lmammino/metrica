const EventEmitter = require('events')
const ms = require('ms')

const defaultOptions = {
  interval: 60000,
  autoStart: true
}

class ProcessMetrics extends EventEmitter {
  constructor (options) {
    super()
    const opt = Object.assign({}, defaultOptions, options)
    this.interval = typeof opt.interval === 'string' ? ms(opt.interval) : opt.interval
    this._ref = null

    if (opt.autoStart) {
      this.start()
    }
  }

  start () {
    if (this._ref === null) {
      this._ref = setInterval(() => {
        this.emit('tick', this.getMetrics())
      }, this.interval)
    }
  }

  stop () {
    if (this._ref !== null) {
      clearInterval(this._ref)
      this._ref = null
    }
  }

  getMetrics () {
    return ({
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      uptime: process.uptime()
    })
  }
}

module.exports = (options) => new ProcessMetrics(options)
