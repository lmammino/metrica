const ProcessMetrics = require('../')

const metricsFormat = {
  cpu: {
    system: expect.any(Number),
    user: expect.any(Number)
  },
  memory: {
    external: expect.any(Number),
    heapTotal: expect.any(Number),
    heapUsed: expect.any(Number),
    rss: expect.any(Number)
  },
  uptime: expect.any(Number)
}

test('It should get metrics', () => {
  const pm = ProcessMetrics({ autoStart: false })
  const metrics = pm.getMetrics()

  expect(metrics).toMatchObject(metricsFormat)
})

test('It should auto start to emit events', (endTest) => {
  const pm = ProcessMetrics({ interval: 10 })
  pm.on('tick', (metrics) => {
    expect(metrics).toMatchObject(metricsFormat)
    pm.stop()
    endTest()
  })
})

test('It should accept an interval as a string', (endTest) => {
  const pm = ProcessMetrics({ interval: '10ms' })
  pm.on('tick', (metrics) => {
    expect(metrics).toMatchObject(metricsFormat)
    pm.stop()
    endTest()
  })
})

test('Calling start twice doesn\'t have any effect', () => {
  const pm = ProcessMetrics({ autoStart: false })
  expect(pm._ref).toBeNull()
  pm.start()
  const initialInterval = pm._ref
  pm.start()
  expect(initialInterval).toBe(pm._ref) // interval didn't change after the second start
  pm.stop()
})

test('Calling stop twice doesn\'t have any effect', () => {
  const pm = ProcessMetrics({ autoStart: true })
  expect(pm._ref).not.toBeNull()
  pm.stop()
  expect(pm._ref).toBeNull()
  pm.stop()
  expect(pm._ref).toBeNull() // interval didn't change after the second stop (still null)

  console.log(pm)
})
