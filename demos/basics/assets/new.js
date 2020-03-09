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