import React from "react";
import { Token, TokenProps } from "./Token";

interface TokenListProps {
    tokens: TokenProps[]
}

const TokenList: React.FC<TokenListProps> = ({tokens}) => {
    return <div className="flex mb-4">
        <div className="mr-6">
        Tokens
        </div>
        <div className="flex">
            {tokens.map((token, i) => <Token key={i} {...token} />)}
        </div>
    </div>
}

export default TokenList