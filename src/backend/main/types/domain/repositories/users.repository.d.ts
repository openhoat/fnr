export interface UserEntity {
  email: string
  id: string
  passwordHash: string
  role: string
  username: string
}

export type UserRepositoryPayload = Omit<UserEntity, 'id' | 'role'> &
  Partial<Pick<UserEntity, 'role'>>

export interface UsersRepository {
  createUser: (data: UserRepositoryPayload) => Promise<UserEntity>
  deleteUser: (id: string) => Promise<UserEntity | undefined>
  fetchAllUsers: () => Promise<UserEntity[]>
  findUserById: (id: string) => Promise<UserEntity | undefined>
  findUserByUsername: (username: string) => Promise<UserEntity | undefined>
}
