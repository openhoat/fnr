const IOC_TYPES = Object.freeze({
  Config: Symbol.for('Config'),
  HttpServer: Symbol.for('HttpServer'),
  Logger: Symbol.for('Logger'),
  Orm: Symbol.for('Orm'),
  UserDomain: Symbol.for('UserDomain'),
  UsersRepository: Symbol.for('UsersRepository'),
})

export { IOC_TYPES }
