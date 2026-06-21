import React from "react"

export function Link({ to, children, ...props }) {
  return React.createElement("a", { href: to, ...props }, children)
}
