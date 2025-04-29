import React from "react"

interface TokenProps {
    literal: string
    precedance?: number
}

const Token: React.FC<TokenProps> = (props) => {
    return <div>
        {props.literal}
    </div>
}

export { Token, type TokenProps }