import { ZeroProvider as ZeroProviderReact } from "@rocicorp/zero/react"
import { zero } from "./client"

type ZeroProviderProps = React.PropsWithChildren

function ZeroProvider({ children }: ZeroProviderProps) {
  return <ZeroProviderReact zero={zero}>{children}</ZeroProviderReact>
}

export { ZeroProvider }
