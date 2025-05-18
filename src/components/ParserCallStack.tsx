import React from "react"

interface ParserCallStackProps {
    parsed: any
    render: any
    frames: any
}

const ParserCallStack: React.FC<ParserCallStackProps> = ({parsed, render}) => {
    return <div>
        <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Call Stack</h2>
        {parsed && 
        <p className="mb-4">Parsed Expression with precedance: 
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {parsed}
        </code>
    </p>
}
        <div>
            {render}
        </div>
    </div>
}

export default ParserCallStack