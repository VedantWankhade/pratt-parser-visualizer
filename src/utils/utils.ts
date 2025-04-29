import { TokenProps } from "../components/Token"
import Lexer from "../parser/lexer"
import { Parser } from "../parser/parser"
import { TokenType } from "../parser/tokens"

const log = {
    info(...msg: unknown[]): void {
        if (import.meta.env.DEV)    // vite takes cares of setting DEV to true or false
            console.log("[INFO]", msg[0], msg[1])
    },
    warn(...msg: unknown[]): void {
        if (import.meta.env.DEV)
            console.log("[WARN]", ...msg)
    }
}

const tokenize = (exp: string): TokenProps[] => {
    const lexer = new Lexer(exp)
    const tokens: TokenProps[] = []
    let t = lexer.nextToken()
    while (t.type !== TokenType.EOF) {
        tokens.push({literal: t.literal})
        t = lexer.nextToken()
    }
    return tokens
}

const parse = (exp: string): string => {
    const p = new Parser(new Lexer(exp))
    return p.parseNext()!.toString()
}

export { log, tokenize, parse }