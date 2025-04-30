import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface TokenProps {
    literal: string
    precedance?: number
}

const Token: React.FC<TokenProps> = (props) => {
   return <Card className="h-10">
  <CardContent>
    <p>{props.literal}</p>
  </CardContent>
</Card>
}

export { Token, type TokenProps }