import { test } from "vitest";
import { Parser } from '../src/parser/parser'
import Lexer from "../src/parser/lexer";

// test('Test expression: identifier', () => {
//     const p = new Parser(new Lexer(`a`))
//     p.parseNext()
// })

test('Test expression: prefix', () => {
    const p = new Parser(new Lexer(`+a`))
    p.parseNext()
})