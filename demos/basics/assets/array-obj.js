// demo大合集
var users = [
  {
    id: 1,
    name: "a"
  },
  {
    id: 2,
    name: "a"
  },
  {
    id: 3,
    name: "b"
  },
  {
    id: 4,
    name: "v"
  }
]
Array.prototype.unique = function () {
  // let names = this.map((item) => item.name)
  // return [...new Set(names)]
  let names = Array.from(this, (item) => item.name)
  return [...new Set(names)]
}

// console.log(users.unique())

var obj = {
  a: 1,
  b: 2,
  c: {
    name: 'malimalihong'
  }
}

function simpleCopy (obj) {
  let result = {}
  for (let key in obj) {
    result[key] = obj[key]
  }
  return result
}

function deepCopy (obj) {
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    let item = obj[key]
    result[key] = typeof item === 'object' ? deepCopy(item) : item
  }
  return result
}

// var newObj = simpleCopy(obj)
var newObj = deepCopy(obj)
obj.a = 3
newObj.a // 1

obj.c.name = 'new'
newObj.c.name // 'new'

// 参数 x 与 函数内部变量 x 同名，x 取参数值，如果 x 被复制，x 为 赋值后的 值
function test (x) {
  console.log(x)
  var x = 10

}

// test(30)

// 方法一和方法二处理闭包
for (var i = 1; i <= 5; i++) {
  setTimeout((function timer(i) {
    return function () {
      // console.log(i);
    }
  })(i), i * 1000);
}

for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function timer() {
        // console.log(i);
    }, i * 1000);
  })(i)
}

var Type = {}
var typeList = ['String', 'Array', 'Number']

for (var i = 0, len = typeList.length; i < len; i++) {
  var type = typeList[i];
  (function (type) {
    Type[`is${type}`] = function (obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
  })(type)
}
// console.log(Type.isArray(4))

/* 高阶函数 */
Function.prototype.before = function (beforeFn) {
  var self = this
  return function () {
    beforeFn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  var self = this
  return function () {
    var ret = self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

var func = function () {
  console.log(2)
}

func = func.before(function () {
  console.log(1)
}).after(function () {
  console.log(3)
})

// func()

var currying = function (fn) {
  var args = []

  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments)
      return arguments.callee
    }
  }
}

var cost = (function () {
  var money = 0
  return function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var cost = currying(cost)

cost(10)
cost(20)
// console.log(cost())

// -------------
var event = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var key = [].shift.call(arguments);
    var fns = this.clientList[key]

    if (!fns || fns.length === 0) return

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key]

    if (!fns) return false

    if (!fn) { // 没有fn表示移除所有订阅
      fns && (fns.length = 0);
    } else {
      for (var i = 0, len = fns.length; i < len; i++ ) {
        var _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
}

var installEvent = function (obj) {
  for (var key in event) {
    obj[key] = event[key]
  }
}

var salesOffices = {}
installEvent(salesOffices)

salesOffices.listen('squareMeter88', function (price) {
  console.log('价格=' + price)
})

salesOffices.listen('squareMeter100', function (price) {
  console.log('价格=' + price)
})

salesOffices.trigger('squareMeter88', 20000)
salesOffices.trigger('squareMeter100', 30000)

// 删除订阅
salesOffices.listen('squareMeter100', f1 = function (price) {
  console.log('价格=' + price)
})
salesOffices.remove('squareMeter100', f1)
salesOffices.trigger('squareMeter100', 30000)


/* Object.defineProperty start*/
var objA = {
  name: 'aaa',
  age: 'bbb'
}

var value
Object.defineProperty(objA, 'name', {
  configurable: false,
  enumerable: false,
  get: function () {
    return value
  },
  set: function (newVal) {
    value = newVal
  }
})

// delete objA.name
// delete objA.age

objA.name = '213'
/* Object.defineProperty end*/
/*
'/foo'.rewrite(/^\/foo/,'bar')//  '/bar'
'/u1234'.rewrite(/^\/u(\d+)/, 'user/$1')// '/user/1234'
'i'.rewrite(/^\/o/, '/ooo');//null
*/

String.prototype.rewrite = function (pattern, result) {
  var reg = pattern.test(this)
  if (reg) {
    return '/' + this.replace(pattern, result)
  } else {
    return null
  }
}

// console.log('/foo'.rewrite(/^\/foo/,'bar'))
// console.log('/u1234'.rewrite(/^\/u(\d+)/, 'user/$1'))

let urlStr = 'http://www.inode.club?name=koala&study=js&study=node'
// 参数转成对象
function queryString(request){
    let params = request.split('?')[1];
    let param = params.split('&');
    let obj = {};
    for (let i = 0;i<param.length;i++){
        let paramsA = param[i].split('=');
        let key = paramsA[0];
        let value = paramsA[1];
        if(obj[key]){
            obj[key] = Array.isArray(obj[key])?obj[key]:[obj[key]];
            obj[key].push(value);
        }else{
            obj[key] = value;
        }
    }
    return obj;
}
// console.log(queryString(urlStr));

function curry(fn, ...args) {
  if(args.length >= fn.length) {
    return fn.apply(null, args);
  }

  return (...args2) => curry(fn, ...args, ...args2);
}

const add = curry(function(a, b, c) {
  return a + b + c;
});


const str = 'abc';
const len = str.length;
const flag = [];
const res = [];

DFS(0);

// cur 表示第 cur 位取得字符
// 每一位有 len 种取法
function DFS(cur) {
  if(cur === len)
    return console.log(res.join(''));

  for(let i = 0; i < len; i++) {
    if(!flag[i]) {
      res[cur] = str[i];
      flag[i] = true;
      DFS(cur + 1);
      flag[i] = false;
    }
  }
}


var quickSort = function(arr) {
  　　if (arr.length <= 1) { return arr; }
  　　var pivotIndex = Math.floor(arr.length / 2);
  　　var pivot = arr.splice(pivotIndex, 1)[0];
  　　var left = [];
  　　var right = [];
  　　for (var i = 0; i < arr.length; i++){
  　　　　if (arr[i] < pivot) {
  　　　　　　left.push(arr[i]);
  　　　　} else {
  　　　　　　right.push(arr[i]);
  　　　　}
  　　}
  　　return quickSort(left).concat([pivot], quickSort(right));
  };

  quickSort([3, 1, 5, 7, 4, 8, 9, 6])