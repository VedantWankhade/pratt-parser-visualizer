import React, { useState } from "react"

interface FramesProps {
    frames: string[][]
}

const Frames: React.FC<FramesProps> = ({frames}) => {
    const [frame, advanceFrame] = useState(0)
    
    return <div>
        <button name="next" onClick={() => advanceFrame(frame < frames.length - 1 ? + frame + 1: frame)}>Next</button>
        <button name="prev" onClick={() => advanceFrame(frame > 0 ? + frame - 1: frame)}>Prev</button>
        {frames[frame].map((f, i) => <p key={i}>{f}</p>)}
    </div>
}

export default Frames