/**
 * bind 的实现
 * @param context 传入的作为this的对象
 */
Function.prototype.MyBind = function (context) {
  var self = this
  var bindArgs = [].slice.call(arguments, 1)
  return function () {
    var args = [].slice.call(arguments)
    args = bindArgs.concat(args)
    return self.apply(context, args)
  }
}
/**
 * 测试demo1
 */
var obj = {
  a: 20,
  getA: function () {
    return this.a
  }
}

var obj2 = {
  a: 30,
  getB: function () {
    return this.a
  }
}

var fn = obj.getA.MyBind(obj2, 'shirley');
console.log(fn());

/**
 * 如果bind绑定后的函数作为构造函数
 */

function funcA () {
  this.a = 5
}

funcA.prototype.getName = function () {
  console.log('a: getname')
}

var objA = {
  a: 40,
  getName: function () {
    console.log(this.a)
  }
}

var funcB = funcA.bind2(objA, 1, 2, 3)
// var funcB1 = new funcB(444)
// console.log(funcB1.__proto__)
