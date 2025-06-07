import { Zero } from "@rocicorp/zero"
import { ZeroProvider as ZeroProviderReact } from "@rocicorp/zero/react"
import { schema, Schema } from "./schema"

type ZeroProviderProps = React.PropsWithChildren

function ZeroProvider({ children }: ZeroProviderProps) {
  const zero = new Zero<Schema, any>({ schema, userID: "anon" })

  return <ZeroProviderReact zero={zero}>{children}</ZeroProviderReact>
}

export { ZeroProvider }
