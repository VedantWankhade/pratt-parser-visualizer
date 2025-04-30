import Lexer from "../parser/lexer"
import { Parser } from "../parser/parser"
import Frames from "./Frames"

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
        <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Call Stack</h2>
        <p className="mb-4">Parsed Expression with precedance: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {parsed}
    </code>
    </p>
        <div>
        {render}
        </div>
    </div>
}

export default ParserCallStack