const winston = require('winston')
const bunyan = require('bunyan')
const BunyanToWinstonStream = require('./index')

const winstonLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new (winston.transports.Console)({
    level: 'debug',
    handleExceptions: true
  })]
})

const log = bunyan.createLogger({
  name: 'test',
  level: 'debug',
  streams: [{
    type: 'raw',
    stream: new BunyanToWinstonStream(winstonLogger)
  }]
})

winstonLogger.info('O.S information', { os: 'linux' })
log.info('O.S information', { os: 'linux' })
log.debug('O.S information', { os: 'linux' })
