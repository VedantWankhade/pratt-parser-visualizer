enum TokenType {
    EOF = "EOF",
    
    LPAREN = "(",
    RPAREN = ")",

    PLUS = "+",
    MINUS = "-",
    ASTERISK = "*",
    SLASH = "/",
    MOD = "%",

    EQUAL = "==",
    NOT_EQUAL = "!=",
    LESSER = "<",
    GREATER = ">",
    LESSER_EQUAL = "<=",
    GREATER_EQUAL = ">=",
    NOT = "!",

    INT = "INT",
    IDENT = "IDENT",

    ASSIGN = "="
}

class Token {
    constructor(public type: TokenType, public literal: string) {}
}

export { Token, TokenType }