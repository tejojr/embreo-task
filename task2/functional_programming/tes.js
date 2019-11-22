// const sumOddNumbers = nums => {
//     let total = 0
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] % 2 !== 0) {
//             total = total + nums[i]
//         }
//     }
//     return total
// }

// const sumOddNumbers = nums => {
//     return nums
//         .filter(num => num % 2 !== 0)
//         .reduce((total, currVal) => total + currVal)
// }
const sumOddNumbers = nums => {
  return nums.reduce(
    (total, currVal) => (currVal % 2 !== 0 ? (total + currVal) : total),
    0
  )
}
// const sumOddUniqueNumbers = nums => {
//   return [...new Set(nums)]
//     .reduce(
//       (total, currVal) => (currVal % 2 !== 0 ? (total + currVal) : total),
//       0
//     )
// }
const sumOddUniqueNumbers = nums => {
  return nums
    .filter((item, i) => nums.indexOf(item) === i)
    .reduce(
      (total, currVal) => (currVal % 2 !== 0 ? (total + currVal) : total),
      0
    )
}

const numbers = [1, 4, 5, 1, 2, 10, 12, 15, 11, 13, 11, 5]
const numbers1 = [1, 5, 4, 1]

console.log(sumOddNumbers(numbers))
console.log(sumOddUniqueNumbers(numbers))
console.log(sumOddNumbers(numbers1))
console.log(sumOddUniqueNumbers(numbers1))
