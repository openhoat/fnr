const IOC_TYPES = Object.freeze({
  Config: Symbol.for('Config'),
  HttpServer: Symbol.for('HttpServer'),
  Logger: Symbol.for('Logger'),
  UserDomain: Symbol.for('UserDomain'),
})

export { IOC_TYPES }
