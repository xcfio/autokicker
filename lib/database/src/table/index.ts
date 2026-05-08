import { guild } from "./guild"
import { member } from "./member"
import { user } from "./user"

export const table = { guild, member, user } as const
