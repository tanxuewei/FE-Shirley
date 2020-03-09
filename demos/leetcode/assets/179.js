/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function(n) {
  var str = 'abcdefghigklmnopqrstuvwxyz'
  var strList = str.split('')
  var result = []
  var resultStr = ''

  if (n === 1) return 'a'

  if (n % 2 === 0) {
    result = [n - 1, 1]
  } else {
    result = [n - 2, 1, 1]
  }

  result.forEach((item, index) => {
    var innerStr = strList[index]
    for (var i = 0; i < item; i++) {
      resultStr += innerStr
    }
  })

  return resultStr
};

// console.log(generateTheString(121))

/**
 * @param {number[]} light
 * @return {number}
 */

var numTimesAllBlue = function(light) {
  var result = 0
  
  light.forEach((item, index) => {
    var flag = false
    for (var j = 0; j <= index; j++) {
      if (light[j] > index + 1) {
        flag = true
        break
      }
    }
    if (!flag) {
      result++
    }
  })

  return result
};

// var light = [2,1,3,5,4]
// var light = [3,2,4,1,5]
// var light = [4,1,2,3]
var light = [1,2,3,4,5,6]

console.log(numTimesAllBlue(light))