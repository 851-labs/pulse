import { Zero } from "@rocicorp/zero"
import { Schema, schema } from "./schema"

const zero = new Zero<Schema>({
  userID: "anon",
  server: "http://localhost:4848",
  schema,
})

export { zero }
