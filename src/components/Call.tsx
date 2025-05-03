import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface CallProps {
    log: string
}

const Call: React.FC<CallProps> = (props) => {
return (

    <Card className="mb-2">
  <CardHeader>
    <CardTitle>{props.log}</CardTitle>
    <CardDescription>{`<is it a prefix token?>`}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>{'left expression'}</p>
  </CardContent>
  <CardFooter>
    <p>{`right expresison`}</p>
  </CardFooter>
</Card>

)
}

export { Call, type CallProps }