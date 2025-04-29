import { useState } from "react"
import TokenList from "./TokenList"
import { TokenProps } from "./Token"
import Lexer from "../parser/lexer"
import { TokenType } from "../parser/tokens"
import ParserCallStack from "./ParserCallStack"
import { tokenize } from "../utils/utils"

function Parser() {
    const [exp, setExp] = useState('')

    return <div>
        <div>
            <label htmlFor="expInput">Expression</label>
            <input type="text" id="expInput" name="expInput" value={exp} onChange={e => setExp(e.target.value)} />
        </div>
        
        
        { exp && 
        <div>
            <TokenList tokens={tokenize(exp)} />
            
            <ParserCallStack exp={exp} />
        </div>}


    </div>
}

export default Parser