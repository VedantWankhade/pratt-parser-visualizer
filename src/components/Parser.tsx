import { useState } from "react"
import TokenList from "./TokenList"
import ParserCallStack from "./ParserCallStack"
import { tokenize } from "../utils/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

function Parser() {
    const [exp, setExp] = useState('')

    return <div className="flex flex-col mr-4 top-0 max-h-screen">
        <div className="flex mb-4">
            <Label className="mr-2" htmlFor="expInput">Expression</Label>
            <Input className="w-100" type="text" id="expInput" name="expInput" value={exp} onChange={e => setExp(e.target.value)} placeholder="a + 2 * b" />
        </div>
        { exp && 
        <div>
            <TokenList tokens={tokenize(exp)} />
            
            <ParserCallStack exp={exp} />
        </div>}


    </div>
}

export default Parser