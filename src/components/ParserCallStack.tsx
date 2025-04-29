import Lexer from "../parser/lexer"
import { Parser } from "../parser/parser"
import { parse } from "../utils/utils"

function ParserCallStack({exp}: {exp: string}) {

    const parser = new Parser(new Lexer(exp))
    let parsed 

    try {
        parsed = parser.parseNext().toString()
    } catch(e: any) {
        parsed = <div style={{color: 'red'}}>{e.message || String(e)}</div>
    }

    return <div>
        Call Stack
        <div>
            <button name="next">Next</button>
            <button name="prev">Prev</button>
        </div>
        {parsed}
    </div>
}

export default ParserCallStack