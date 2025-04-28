import { log } from "../utils/utils";
import Lexer from "./lexer";
import { Token, TokenType } from "./tokens";
import { Expression, Identifier, PrefixExpression } from './ast'

enum Precedance {
    LOWEST,
    SUM,
    PRODUCT,
    PREFIX,
    CALL
}

const precedance: Map<TokenType, Precedance> = new Map<TokenType, Precedance>([
    [TokenType.PLUS, Precedance.SUM],
    [TokenType.MINUS, Precedance.SUM],
    [TokenType.SLASH, Precedance.PRODUCT],
    [TokenType.ASTERISK, Precedance.PRODUCT],
])

type prefixFunction = () => Expression
type infixFunction = (left: Expression) => Expression

class Parser {
    private lexer: Lexer
    private currToken!: Token;
    private peekToken!: Token;
    private prefixFunctions: Map<TokenType, prefixFunction> = new Map<TokenType, prefixFunction>([
        [TokenType.IDENT, this.parseIdentifier],
        [TokenType.PLUS, this.parsePrefixExpression],
    ]) 
    private infixFunctions: Map<TokenType, infixFunction> = new Map<TokenType, infixFunction>([
    ]) 

    constructor(lexer: Lexer) {
        this.lexer = lexer
        this.nextToken()
    }

    parseNext(precedance: Precedance = Precedance.LOWEST): Expression | null {
        this.nextToken()
        log.info("PARSER: Parsing", this.currToken)  
        
        const prefix = this.prefixFunctions.get(this.currToken.type)
        if (!prefix) {
            log.warn("PARSER: No prefix function found for", this.currToken)
            return null
        }
        log.info("PARSER: Prefix function found for", this.currToken)
        let left = prefix.bind(this)()
        log.info("PARSER: Left expression is:", left.toString())

        while (precedance < this.peekPrecedance()) {
            const infix = this.infixFunctions.get(this.peekToken.type)
            if (!infix) {
                log.warn("PARSER: No infix function found for", this.peekToken)
                return left
            }
            log.info("PARSER: Inifx function found for", this.peekToken)
            this.nextToken()
            left = infix(left)
        }
        log.info("PARSER: The expression is:", left.toString())
        return left
    }

    private parseIdentifier(): Expression {
        return new Identifier(this.currToken, this.currToken.literal)
    }

    private parsePrefixExpression(): Expression {
        const curTok = this.currToken
        const val = this.parseNext(Precedance.PREFIX)
        return new PrefixExpression(curTok, curTok.literal, val!)
    }

    private nextToken(): void {
        this.currToken = this.peekToken
        this.peekToken = this.lexer.nextToken()
    }

    private peekPrecedance(): Precedance {
        return precedance.get(this.peekToken.type)!
    }
}

export { Parser }