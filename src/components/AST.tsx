import { Expression } from "@/parser/ast"
import React from "react"

interface ASTProps {
    expr: Expression
}

const AST: React.FC<ASTProps> = ({expr}) => {
    return <div className='ml-4'>
        <h2 className="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">AST</h2>
       { expr && <p>{expr.toString()}</p>}
    </div>
}

export default AST