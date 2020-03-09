/* ------------------- */
// 178 - 1
//输入：nums = [8,1,2,2,3]
//输出：[4,0,1,1,3]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
  let result = [];
  let numsNew = [...nums].sort((a, b) => a - b) // 1 2 3 8
  nums.forEach(item => {
    for (let j = 0, len1 = numsNew.length; j < len1; j++) {
      let item1 = numsNew[j]
      if (item === item1) {
        if (item1 === numsNew[j - 1]) {
          result.push(j - 1)
          return
        } else {
          result.push(j)
          return
        }
      }
    }
  })
  return result
};

var nums = [8,1,2,2,3]
// let nums = [6,5,4,8]
// let nums = [7,7,7,7]
console.log(smallerNumbersThanCurrent(nums))

// 178 - 2
var rankTeams = function(votes) {
  if (votes.length < 2) return votes

  let teamResult = {}
  let result = []
  let resultStr = []
  votes.forEach(item => {
    let itemArr = item.split('')

    itemArr.forEach((item1, index1) => {
      let i = index1 + 1
      if (teamResult[item1]) {
        if (teamResult[item1][i]) {
          teamResult[item1][i]++
        } else {
          teamResult[item1][i] = 1
        }
      } else {
        teamResult[item1] = []
        teamResult[item1][i] = 1
      }
    })
  })

  // 排序
  for (let key in teamResult) {
    result.push({ [key]: teamResult[key]})
  }

  result.forEach(item => {
    
    result.forEach(item1 => {
    })
  })

  return result
};

let votes = ["ABC","ACB","ABC","ACB","ACB"]
// console.log(rankTeams(votes))