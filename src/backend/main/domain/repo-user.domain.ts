import Boom from '@hapi/boom'
import { compare, hash } from 'bcryptjs'

import type {
  UserEntity,
  UsersRepository,
} from '../types/domain/repositories/users.repository'
import type { UserDomain, UserDto, UserPayload } from '../types/domain/user'

const defaultPasswordHashSalt = 10

const checkPassword = (
  password: string,
  passwordHash: string,
): Promise<boolean> => compare(password, passwordHash)

const hashPassword = (
  password: string,
  salt = defaultPasswordHashSalt,
): Promise<string> => hash(password, salt)

const toUserDto = (user: UserEntity): UserDto => {
  const { passwordHash, ...userDto } = user
  return userDto
}

const toUserDtos = (users: UserEntity[]): UserDto[] =>
  users.map((user) => toUserDto(user))

class RepositoryUserDomain implements UserDomain {
  readonly #usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.#usersRepository = usersRepository
  }

  async createUser(data: UserPayload): Promise<UserDto> {
    const passwordHash = await hashPassword(data.password)
    const { username, email, role } = data
    const user = await this.#usersRepository.createUser({
      email,
      passwordHash,
      role,
      username,
    })
    return toUserDto(user)
  }

  async deleteUser(id: string): Promise<UserDto | undefined> {
    const user = await this.#usersRepository.deleteUser(id)
    return user ? toUserDto(user) : user
  }

  async fetchAllUsers(): Promise<UserDto[]> {
    const users = await this.#usersRepository.fetchAllUsers()
    return toUserDtos(users)
  }

  async findUserById(id: string): Promise<UserDto | undefined> {
    const user = await this.#usersRepository.findUserById(id)
    return user ? toUserDto(user) : user
  }

  async findUserByUsername(username: string): Promise<UserDto | undefined> {
    const user = await this.#usersRepository.findUserByUsername(username)
    return user ? toUserDto(user) : user
  }

  isUser = (o: unknown): o is UserEntity => {
    if (!o || typeof o !== 'object') {
      return false
    }
    const user = o as Partial<UserEntity>
    return (
      typeof user.id === 'string' &&
      typeof user.email === 'string' &&
      typeof user.role === 'string' &&
      typeof user.username === 'string'
    )
  }

  async signIn(username = '', password = ''): Promise<UserDto> {
    const user = await this.#usersRepository.findUserByUsername(username)
    const isPasswordOk = await checkPassword(password, user?.passwordHash ?? '')
    if (!user || !isPasswordOk) {
      throw Boom.unauthorized()
    }
    return toUserDto(user)
  }
}

export { RepositoryUserDomain }
