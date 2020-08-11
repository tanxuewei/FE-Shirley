/**
 * 设计模式中提到的节流，对应用 setTimeout 实现
 * @param {*} fn 
 * @param {*} interval 
 */
var throttle = function (fn, interval) {
  var _self = fn,
    timer,
    firstTime = true

  return function () {
    var args = arguments,
      _me = this

    if (firstTime) {
      _self.apply(_me, args)
      return firstTime = false
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearInterval(timer)
      timer = null
      _self.apply(_me, args)
    }, interval || 500)
  }
}

// window.onresize = throttle(function () {
//   console.log(1)
// }, 500)

function debounce (func, wait) {
  var timeout = null

  return function () {
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    } 
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}



function throttle (func, wait) {
  var timeout

  return function () {
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
}

// window.onresize = debounce(function () {
//   console.log(1)
// }, 500)

window.onresize = throttle(function () {
  console.log(2)
}, 1000)
