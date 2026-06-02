import { pgEnum } from "drizzle-orm/pg-core"

export const actionEnum = pgEnum("action_type", ["kick", "ban"])
export const activityTypeEnum = pgEnum("activity_type", ["message", "voice", "reaction", "seed"])
