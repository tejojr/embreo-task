const numbers = [1, 4, 5, 1, 2, 10, 12, 15, 11, 13, 11, 5]
console.log(numbers.filter((a, i, num) => num.indexOf(a) === i)
.reduce((a, b) => (b % 2 !== 0 ? a + b : a), 0))

// console.log([...new Set(numbers)].reduce((a, b) => (b % 2 !== 0 ? (a + b) : a),0))
