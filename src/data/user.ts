export type User = {
  email: string
  username: string
  roles: string[]
  permissions: string[]
}

export function createUser(data: Partial<User> = {}): User {
  return {
    email: data.email ?? '',
    username: data.username ?? '',
    roles: data.roles ?? [],
    permissions: data.permissions ?? [],
  }
}
