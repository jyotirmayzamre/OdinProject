const { capital, reverse, calculator, caesarCipher, analyzeArray } = require('./index');

test('Checks for capital letter', () => {
    expect(capital('hello')).toMatch(/^[A-Z].*$/);
})

test('Checks for string reversal', () => {
    expect(reverse('hello')).toBe('olleh');
})

test('Addition', ()=>{
    expect(calculator.add(3, 4)).toBe(7);
})

test('Subtraction', () => {
    expect(calculator.subtract(5, 2)).toBe(3);
})

test('Multiply', () => {
    expect(calculator.multiply(4, 5)).toBe(20);
})

test('Divide', () => {
    expect(calculator.divide(6, 3)).toBe(2);
})


test('Array func', () => {
    expect(analyzeArray([1,8,3,4,2,6])).toEqual({ average: 4, min: 1, max: 8, length: 6});
})

test('cipher', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc');
})

test('cipher2', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
})


test('cipher3', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
})