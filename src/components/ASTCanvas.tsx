import { Expression, Identifier, InfixExpression, PrefixExpression } from "@/parser/ast";
import React, { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface ASTCanvasProps {
    astFrames: Expression[]
}

let currentX = 0;

function computePositions(
    expr: Expression,
    depth: number = 0,
    xCounter: { value: number } = { value: 0 },
    positions: Map<Expression, { x: number, y: number }> = new Map(),
    spacingX: number = 80,
    spacingY: number = 120 // increased vertical spacing
  ): Map<Expression, { x: number, y: number }> {
    if (expr instanceof InfixExpression) {
      computePositions(expr.left, depth + 1, xCounter, positions, spacingX, spacingY);
      const x = xCounter.value++ * spacingX;
      const y = depth * spacingY;
      positions.set(expr, { x, y });
      computePositions(expr.right, depth + 1, xCounter, positions, spacingX, spacingY);
    } else if (expr instanceof PrefixExpression) {
      const x = xCounter.value++ * spacingX;
      const y = depth * spacingY;
      positions.set(expr, { x, y });
      computePositions(expr.value, depth + 1, xCounter, positions, spacingX, spacingY);
    } else {
      const x = xCounter.value++ * spacingX;
      const y = depth * spacingY;
      positions.set(expr, { x, y });
    }
    return positions;
  }

function drawAST(
    ctx: CanvasRenderingContext2D,
    expr: Expression,
    positions: Map<Expression, { x: number, y: number }>
  ) {
    const pos = positions.get(expr);
    if (!pos) return;
  
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    ctx.font = "20px inter";
    ctx.strokeRect(pos.x, pos.y, 40, 40);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    let label = "";
    if (expr instanceof Identifier) {
      label = expr.tokenLiteral();
    } else if (expr instanceof PrefixExpression) {
      label = expr.tokenLiteral();
    } else if (expr instanceof InfixExpression) {
      label = expr.operator;
    }
    ctx.fillText(label, pos.x + 20, pos.y + 20);
  
    // draw edges and recurse
    if (expr instanceof InfixExpression) {
      drawLineToChild(ctx, pos, positions.get(expr.left));
      drawLineToChild(ctx, pos, positions.get(expr.right));
      drawAST(ctx, expr.left, positions);
      drawAST(ctx, expr.right, positions);
    } else if (expr instanceof PrefixExpression) {
      drawLineToChild(ctx, pos, positions.get(expr.value));
      drawAST(ctx, expr.value, positions);
    }
  }

function drawLineToChild(ctx: CanvasRenderingContext2D, from?: { x: number, y: number }, to?: { x: number, y: number }) {
    if (!from || !to) return;
    ctx.beginPath();
    ctx.moveTo(from.x + 20, from.y + 40);
    ctx.lineTo(to.x + 20, to.y);
    ctx.stroke();
}

// const drawASTNode = (ctx: CanvasRenderingContext2D, expr: Expression, d = 0, y = 20, x = 150): void => {
//     ctx.strokeStyle = "#fff";
//     ctx.fillStyle = "#fff";
//     ctx.font = "20px inter";
//     ctx.strokeRect(x, d * y, 40, 40);
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     switch (true) {
//         case expr instanceof Identifier:
//             ctx.fillText(expr.tokenLiteral(), x + 10, d * y + 10, x);
//             break
//         case expr instanceof PrefixExpression:
//             ctx.fillText(expr.tokenLiteral(), x + 10, d * y + 5, x);
//             drawASTNode(ctx, (expr as PrefixExpression).value, d + 1, y + 40, x)
//             break
//         case expr instanceof InfixExpression:
//             ctx.fillText(expr.operator, x + 10, d * y + 10, 40);
//             drawASTNode(ctx, (expr as InfixExpression).left, d + 1, y + 40, x - 40)
//             drawASTNode(ctx, (expr as InfixExpression).right, d + 1, y + 40, x + 40)
//             break
//     }
// } 

const ASTCanvas: React.FC<ASTCanvasProps> = ({astFrames}) => {
    // TODO
    // only rendering last expression for now
    // change letter to bind it to the next button
    const f = astFrames[astFrames.length - 1]
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const convasCtx = canvas.getContext('2d')
        // console.log(f.toString())
        // drawASTNode(convasCtx, f)
        const positions = computePositions(f, 0, { value: 0 }, new Map(), 80, 120);
        drawAST(convasCtx, f, positions);
    }, [])

    return (
            <ScrollArea className="h-[600px] w-[800px] rounded-md border">
        <canvas ref={canvasRef} width='800px' height='600px' className="border-2 border-accent"     
        >{f.toString()}</canvas>
        </ScrollArea>
    )
}

export default ASTCanvas