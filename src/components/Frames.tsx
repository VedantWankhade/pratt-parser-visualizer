import React, { useState } from "react"
import { Button } from "./ui/button"
import { Call } from "./Call"

interface FramesProps {
    frames: string[][]
}

const Frames: React.FC<FramesProps> = ({frames}) => {
    const [frame, advanceFrame] = useState(0)
    
    return <div>
        <div className="mb-4">
            <Button className="mr-2 cursor-pointer" name="next" onClick={() => advanceFrame(frame < frames.length - 1 ? + frame + 1: frame)}>Next</Button>
            <Button className="cursor-pointer" name="prev" onClick={() => advanceFrame(frame > 0 ? + frame - 1: frame)}>Prev</Button>
            </div>
        {frames[frame].map((f, i) => <Call log={f} key={i} />)}
    </div>
}

export default Frames