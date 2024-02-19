import type { UserEntity } from './repositories/users.repository'

export type UserDto = Omit<UserEntity, 'passwordHash' | 'role'> &
  Partial<Pick<UserEntity, 'role'>>

export type UserPayload = Omit<UserDto, 'id'> & {
  password: string
}

export interface UserDomain {
  createUser: (data: UserPayload) => Promise<UserDto>
  deleteUser: (id: string) => Promise<UserDto | undefined>
  fetchAllUsers: () => Promise<UserDto[]>
  findUserById: (id: string) => Promise<UserDto | undefined>
  findUserByUsername: (username: string) => Promise<UserDto | undefined>
  signIn: (username?: string, password?: string) => Promise<UserDto>
}
