/**
 * new 的实现
 */
var objectFactory = function () {
  var obj = new Object()
  var Constructor = [].shift.call(arguments)
  var ret

  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret : obj
}

function Person (name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

// console.log(objectFactory(Person, 'shirley'))

function myInstanceOf (left, right) {
  const prototype = right.prototype
  left = left.__proto__

  while(true) {
    if (!left) {
      return false
    }
    if (prototype === left) {
      return true
    }
    left = left.__proto__
  }
}

// Promise.all 实现
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises)
    let result = []
    let count = 0
    for (let i = 0, len = promises.length; i < len; i++) {
      Promise.resolve(promises[index]).then(data => {
        result[i] = data
        if (++count === promises.length) {
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
        return
      })
    }
  })
}