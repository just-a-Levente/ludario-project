export type User = {
  email: string
  username: string
  passwordhash: string
  isAdmin: boolean
}

export function createUser(
  newEmail: string,
  newUsername: string,
  newPasswordhash: string,
  adminStatus: boolean,
): User {
  return {
    email: newEmail,
    username: newUsername,
    passwordhash: newPasswordhash,
    isAdmin: adminStatus,
  }
}
