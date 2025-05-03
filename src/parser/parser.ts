import { log } from "../utils/utils";
import Lexer from "./lexer";
import { Token, TokenType } from "./tokens";
import { Expression, Identifier, InfixExpression, PrefixExpression } from './ast'

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
    [TokenType.MOD, Precedance.PRODUCT],
])

type prefixFunction = () => Expression
type infixFunction = (left: Expression) => Expression

class Parser {
    private lexer: Lexer
    private currToken!: Token;
    private peekToken!: Token;
    astFrames: Expression[]
    frames: string[][]

    private prefixFunctions: Map<TokenType, prefixFunction> = new Map<TokenType, prefixFunction>([
        [TokenType.IDENT, this.parseIdentifier],
        [TokenType.INT, this.parseIdentifier], // integer is parsed the same ways as ident
        [TokenType.PLUS, this.parsePrefixExpression],
        [TokenType.MINUS, this.parsePrefixExpression],
    ]) 
    private infixFunctions: Map<TokenType, infixFunction> = new Map<TokenType, infixFunction>([
        [TokenType.PLUS, this.parseInfixExpression],
        [TokenType.MINUS, this.parseInfixExpression],
        [TokenType.ASTERISK, this.parseInfixExpression],
        [TokenType.SLASH, this.parseInfixExpression],
        [TokenType.MOD, this.parseInfixExpression],
    ]) 

    constructor(lexer: Lexer) {
        this.lexer = lexer
        this.frames = [[]]
        this.astFrames = []
        this.nextToken()
    }

    private recordAST(expr: Expression): void {
        this.astFrames.push(expr)
    }

    private record(msg: string): void {
        const prev = [...this.frames[this.frames.length - 1]]
        prev.push(msg)
        this.frames.push(prev)
    }

    parseNext(precedance: Precedance = Precedance.LOWEST): Expression {
        this.nextToken()
        log.info("PARSER: Parsing", this.currToken)  
        this.record("Parsing token: " + this.currToken.literal)
        
        const prefix = this.prefixFunctions.get(this.currToken.type)
        if (!prefix) {
            log.warn("PARSER: No prefix function found for", this.currToken)
            throw new Error("Syntax error in expression")
        }
        log.info("PARSER: Prefix function found for", this.currToken)
        let left = prefix.bind(this)()
        log.info("PARSER: Left expression is:", left.toString())
        this.record("Left expression is: " + left.toString())
        while (precedance < this.peekPrecedance()) {
            const infix = this.infixFunctions.get(this.peekToken.type)
            if (!infix) {
                log.warn("PARSER: No infix function found for", this.peekToken)
                return left
            }
            log.info("PARSER: Inifx function found for", this.peekToken)
            this.nextToken()
            left = infix.bind(this)(left)
        }
        log.info("PARSER: The expression is:", left.toString())
        this.record("Actual expression is: " + left.toString())
        this.recordAST(left)
        return left
    }

    private parseIdentifier(): Expression {
        return new Identifier(this.currToken, this.currToken.literal)
    }

    private parsePrefixExpression(): Expression {
        const curTok = this.currToken
        const val = this.parseNext(Precedance.PREFIX)!
        log.info("PARSER: Right expression is:", val.toString())
        return new PrefixExpression(curTok, curTok.literal, val!)
    }

    private parseInfixExpression(left: Expression): Expression {
        const currToken = this.currToken
        this.record("Parsing token: " + this.currToken.literal)
        const right = this.parseNext(this.curPrecedance())!
        this.record("Right expression is: " + right.toString())
        log.info("PARSER: Right expression is:", right.toString())
        return new InfixExpression(this.currToken, currToken.literal, left, right)
    }

    private curPrecedance(): Precedance {
        return precedance.get(this.currToken.type)!
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