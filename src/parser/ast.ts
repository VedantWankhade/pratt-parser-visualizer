import { Token } from "./tokens"

interface Expression {
    tokenLiteral(): string
    token: Token
    toString(): string
}

class Identifier implements Expression {
    token: Token
    value: string

    constructor(token: Token, value: string) {
        this.token = token
        this.value = value
    }

    tokenLiteral(): string {
        return this.token.literal
    }

    toString(): string {
        return this.token.literal
    }
}

class PrefixExpression implements Expression {
    token: Token
    operator: string
    value: Expression;
    
    constructor(token: Token, operator: string, value: Expression) {
        this.token = token
        this.value = value
        this.operator = operator
    }

    tokenLiteral(): string {
        return this.token.literal
    }

    toString(): string {
        const buf: string[] = []
        buf.push('(')
        buf.push(this.operator)
        buf.push(this.value.toString())
        buf.push(')')
        return buf.join('')
    }
}

class InfixExpression implements Expression {
    token: Token
    operator: string
    left: Expression
    right: Expression;
    
    constructor(token: Token, operator: string, left: Expression, right: Expression) {
        this.token = token
        this.right = right
        this.left = left
        this.operator = operator
    }

    tokenLiteral(): string {
        return this.token.literal
    }

    toString(): string {
        const buf: string[] = []
        buf.push('(')
        buf.push(this.left.toString())
        buf.push(this.operator)
        buf.push(this.right.toString())
        buf.push(')')
        return buf.join('')
    }
}


export { type Expression, Identifier, PrefixExpression, InfixExpression }