Function.prototype.MyBind = function (context) {
  var self = this
  var bindArgs = [].slice.call(arguments, 1)
  return function () {
    var args = [].slice.call(arguments)
    args = bindArgs.concat(args)
    return self.apply(context, args)
  }
}
/* ----------------- */
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

var fn = obj.getA(obj2, 'shirley')
console.log(fn())

/* ----------------- */
