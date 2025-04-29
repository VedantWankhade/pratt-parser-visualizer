import { expect, test } from "vitest";
import { Parser } from '../src/parser/parser'
import Lexer from "../src/parser/lexer";

test('Test expressions', () => {
    const tests: {source: string, expected: string}[] = [
        {
            source: `a`,
            expected: `a`
        },
        {
            source: `+a`,
            expected: `(+a)`
        },
        {
            source: `b + a`,
            expected: `(b+a)`
        },
        {
            source: `b + a * 2`,
            expected: `(b+(a*2))`
        },
        {
            source: `b + a % 2`,
            expected: `(b+(a%2))`
        },
        {
            source: `b * a * 2`,
            expected: `((b*a)*2)`
        },
        {
            source: `b / a * 2`,
            expected: `((b/a)*2)`
        },
        {
            source: `b * a / 2 + 22`,
            expected: `(((b*a)/2)+22)`
        }
    ]
    for (const test of tests) {
        const p = new Parser(new Lexer(test.source))
        expect(p.parseNext()?.toString()).toStrictEqual(test.expected)
    }
})