import { Card, CardContent } from "./ui/card"

interface CallProps {
    log: string
}

const Call: React.FC<CallProps> = (props) => {
   return <Card className="mb-2">
  <CardContent>
    <p>{props.log}</p>
  </CardContent>
</Card>
}

export { Call, type CallProps }