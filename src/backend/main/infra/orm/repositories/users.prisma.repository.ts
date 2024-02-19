import type { PrismaClient } from '@prisma/client'

import type {
  UserEntity,
  UserRepositoryPayload,
  UsersRepository,
} from '../../../types/domain/repositories/users.repository'

class UsersPrismaRepository implements UsersRepository {
  readonly #prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  createUser(data: UserRepositoryPayload): Promise<UserEntity> {
    const { email, passwordHash, role, username } = data
    return this.#prisma.user.create({
      data: { email, passwordHash, role, username },
    })
  }

  deleteUser(id: string): Promise<UserEntity | undefined> {
    return this.#prisma.user.delete({ where: { id } })
  }

  fetchAllUsers(): Promise<UserEntity[]> {
    return this.#prisma.user.findMany()
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    const user = await this.#prisma.user.findUnique({
      where: { id },
    })
    return user ?? undefined
  }

  async findUserByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await this.#prisma.user.findUnique({
      where: { username },
    })
    return user ?? undefined
  }
}

export { UsersPrismaRepository }
