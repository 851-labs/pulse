import { Zero } from "@rocicorp/zero"
import { schema } from "./schema"

const zero = new Zero({
  userID: "anon",
  server: "http://localhost:4848",
  schema,
})

export { zero }
