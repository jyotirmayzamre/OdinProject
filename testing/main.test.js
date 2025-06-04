const capital = require('./index');

test('Checks for capital letter', () => {
    expect(capital('hello').toMatch('^[A-Z].*$'))
})