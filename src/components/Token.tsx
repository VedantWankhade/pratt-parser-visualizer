import React from "react"
import { Card, CardContent } from "./ui/card"

interface TokenProps {
    literal: string
    precedance?: number
}

const Token: React.FC<TokenProps> = (props) => {
   return <Card className="h-10 py-2 mr-2">
  <CardContent>
    <p>{props.literal}</p>
  </CardContent>
</Card>
}

export { Token, type TokenProps }