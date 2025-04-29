import React from "react";
import { Token, TokenProps } from "./Token";

interface TokenListProps {
    tokens: TokenProps[]
}

const TokenList: React.FC<TokenListProps> = ({tokens}) => {
    return <div>
        Tokens
        <ol>
            {tokens.map((token, i) => <Token key={i} {...token} />)}
        </ol>
    </div>
}

export default TokenList