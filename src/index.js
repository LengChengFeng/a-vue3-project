let str = 'applee'
let obj = {}
const newArr = str.split('')
for (let i = 0; i < newArr.length; i++) {
  if (obj[newArr[i]]) {
    obj[newArr[i]]++
  } else {
    obj[newArr[i]] = 1
  }
}

let max = 0
let index = 0
let num = []
for (let i in obj) {
  // console.log(i)
  if (obj[i] > max) {
    max = obj[i]
    index = i
    num.push(i)
  }
}

console.log(num)
