import { Expression, Identifier, InfixExpression, PrefixExpression } from "@/parser/ast";
import React, { useEffect, useRef } from "react";

interface ASTCanvasProps {
    astFrames: Expression[]
}

const drawASTNode = (ctx: CanvasRenderingContext2D, expr: Expression, d = 0, x = 150): void => {
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    ctx.strokeRect(x, d, 20, 20);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    switch (true) {
        case expr instanceof Identifier:
            ctx.fillText(expr.tokenLiteral(), x + 5, d + 5);
            break
        case expr instanceof PrefixExpression:
            ctx.fillText(expr.tokenLiteral(), x + 5, d + 5);
            drawASTNode(ctx, (expr as PrefixExpression).value, d + 20, x)
            break
        case expr instanceof InfixExpression:
            ctx.fillText(expr.operator, x + 5, d + 5);
            drawASTNode(ctx, (expr as InfixExpression).left, d + 20, x - 20)
            drawASTNode(ctx, (expr as InfixExpression).right, d + 20, x + 20)
            break
    }
} 

const ASTCanvas: React.FC<ASTCanvasProps> = ({astFrames}) => {
    // TODO
    // only rendering last expression for now
    // change letter to bind it to the next button
    const f = astFrames[astFrames.length - 1]
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const convasCtx = canvas.getContext('2d')
        console.log(f.toString())
        drawASTNode(convasCtx, f)
    }, [])

    return (
        <canvas ref={canvasRef} className="border-2 border-accent h-full w-full"     
        >{f.toString()}</canvas>
    )
}

export default ASTCanvas