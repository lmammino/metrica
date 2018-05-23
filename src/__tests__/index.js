const Metrica = require('../')

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
  const m = Metrica({ autoStart: false })
  const metrics = m.getMetrics()

  expect(metrics).toMatchObject(metricsFormat)
})

test('It should auto start to emit events', (endTest) => {
  const m = Metrica({ interval: 10 })
  m.on('tick', (metrics) => {
    expect(metrics).toMatchObject(metricsFormat)
    m.stop()
    endTest()
  })
})

test('It should accept an interval as a string', (endTest) => {
  const m = Metrica({ interval: '10ms' })
  m.on('tick', (metrics) => {
    expect(metrics).toMatchObject(metricsFormat)
    m.stop()
    endTest()
  })
})

test('Calling start twice doesn\'t have any effect', () => {
  const m = Metrica({ autoStart: false })
  expect(m._ref).toBeNull()
  m.start()
  const initialInterval = m._ref
  m.start()
  expect(initialInterval).toBe(m._ref) // interval didn't change after the second start
  m.stop()
})

test('Calling stop twice doesn\'t have any effect', () => {
  const m = Metrica({ autoStart: true })
  expect(m._ref).not.toBeNull()
  m.stop()
  expect(m._ref).toBeNull()
  m.stop()
  expect(m._ref).toBeNull() // interval didn't change after the second stop (still null)
})
