
const bunyan = require('bunyan')

class BunyanToWinstonStream {
  constructor (winston) {
    this.winston = winston
  }
  write (logEntry) {
    let logLevel
    if (logEntry.level <= bunyan.DEBUG) {
      logLevel = 'debug'
    } else if (logEntry.level <= bunyan.INFO) {
      logLevel = 'info'
    } else if (logEntry.level <= bunyan.WARN) {
      logLevel = 'warn'
    } else {
      logLevel = 'error'
    }
    const meta = (({ msg, v, level, ...meta }) => ({ ...meta }))(logEntry)

    this.winston.log(logLevel, logEntry.msg, meta)
  }
}

module.exports = BunyanToWinstonStream
