const IOC_TYPES = Object.freeze({
  Config: Symbol.for('Config'),
  HttpServer: Symbol.for('HttpServer'),
  Logger: Symbol.for('Logger'),
})

export { IOC_TYPES }
