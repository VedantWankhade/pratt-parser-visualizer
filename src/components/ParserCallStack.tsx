import Lexer from "../parser/lexer"
import { Parser } from "../parser/parser"
import { parse } from "../utils/utils"
import Frames from "./frames"

function ParserCallStack({exp}: {exp: string}) {

    const parser = new Parser(new Lexer(exp))
    let parsed 
    let render
    let frames 
    try {
        parsed = parser.parseNext().toString()
        frames = parser.frames
        console.log(frames)
        render = <Frames frames={frames}/>
    } catch(e: any) {
        parsed = <div style={{color: 'red'}}>{e.message || String(e)}</div>
    }

    return <div>
        Call Stack
        <div>
        {render}
        </div>
        {parsed}
    </div>
}

export default ParserCallStack