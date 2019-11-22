const numbers = [1, 4, 5, 1, 2, 10, 12, 15, 11, 13, 11, 5]
console.log(numbers.reduce((a, b) => (b % 2 !== 0 ? a + b : a), 0))
