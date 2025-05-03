import { Expression } from "@/parser/ast";
import React, { useEffect, useRef } from "react";

interface ASTCanvasProps {
    astFrames: Expression[]
    width: number
    height: number
}

const ASTCanvas: React.FC<ASTCanvasProps> = ({astFrames, width, height}) => {
    // TODO
    // only rendering last expression for now
    // change letter to bind it to the next button
    const f = astFrames[astFrames.length - 1]
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const convasCtx = canvas.getContext('2d')
        convasCtx.fillStyle = '#222222'
        convasCtx.fillRect(0, 0, 20, 10)
    }, [])

    return (
        <canvas ref={canvasRef} className="border-2 border-accent" 
        height={height} 
        width={width}
        
        >{f.toString()}</canvas>
    )
}

export default ASTCanvas