/* -------------------------------------------- */
// ES5
function Node (key) {
  this.key = key
  this.left = null
  this.right = null
}

function BinaryTree () {
  this.root = null
  this.preOrderTraverseList = []
  this.inOrderTraverseList = []
  this.postOrderTraverseList = []
}

// 插入，判断根节点是否有值
BinaryTree.prototype.insert = function (key) {
  var newNode = new Node(key)

  if (this.root === null) {
    this.root = newNode
  } else {
    this.insertNode(this.root, newNode)
  }
}

// 放置左右节点的值
BinaryTree.prototype.insertNode = function (node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode
    } else {
      this.insertNode(node.left, newNode)
    }
  } else {
    if (node.right === null) {
      node.right = newNode
    } else {
      this.insertNode(node.right, newNode)
    }
  }
}

// 先序
BinaryTree.prototype.preOrderTraverse = function () {
  this.preOrderTraverseList = []
  this.preOrderTraverseNode(this.root)
}

BinaryTree.prototype.preOrderTraverseNode = function (node) {
  if (node !== null) {
    // (node.key)
    this.preOrderTraverseList.push(node.key)
    this.preOrderTraverseNode(node.left)
    this.preOrderTraverseNode(node.right)
  }
}

// 中序
BinaryTree.prototype.inOrderTraverse = function () {
  this.inOrderTraverseList = []
  this.inOrderTraverseNode(this.root)
}

BinaryTree.prototype.inOrderTraverseNode = function (node) {
  if (node !== null) {
    this.inOrderTraverseNode(node.left)
    this.inOrderTraverseList.push(node.key)
    this.inOrderTraverseNode(node.right)
  }
}

// 后序
BinaryTree.prototype.postOrderTraverse = function () {
  this.postOrderTraverseList = []
  this.postOrderTraverseNode(this.root)
}

BinaryTree.prototype.postOrderTraverseNode = function (node) {
  if (node !== null) {
    this.postOrderTraverseNode(node.left)
    this.postOrderTraverseNode(node.right)
    this.postOrderTraverseList.push(node.key)
  }
}

// 广度优先遍历
BinaryTree.prototype.bfs = function () {
  this.result = []
  this.remainNodes = [this.root];

  while (this.remainNodes.length > 0) {
    [...this.remainNodes].forEach(item => {
      this.remainNodes.shift()
      this.result.push(item.key)
      item.left && this.remainNodes.push(item.left)
      item.right && this.remainNodes.push(item.right)
    })
  }
}

BinaryTree.prototype.levelOrder = function() {
  var result = []
  var remainNodes = [this.root]

  while (remainNodes.length > 0) {
      var levelNodes = [];
      [...remainNodes].forEach(item => {
          remainNodes.shift()
          levelNodes.push(item.val || item.key)
          item.left && remainNodes.push(item.left)
          item.right && remainNodes.push(item.right)
      })
      result.push(levelNodes)
  }

  return result
};

BinaryTree.prototype.maxDepth = function () {
  if (!this.root) return 0
  var left = this.maxDepth(root.left)
  var right = this.maxDepth(root.right)
  return Math.max(left, right) + 1
}

BinaryTree.prototype.hasPathSum = function(root, sum) {
  if (root === null) return false

  sum -= root.key
  if (root.left === null && root.right === null) {
    return sum === 0
  }

  return this.hasPathSum(root.left, sum) || this.hasPathSum(root.right, sum)
};

var nodes = [8,3,10,1,6,14,4,7,13];
var binaryTree = new BinaryTree()
nodes.forEach(function (key) {
  binaryTree.insert(key)
})

binaryTree.preOrderTraverse()
binaryTree.inOrderTraverse()
binaryTree.postOrderTraverse()
binaryTree.bfs()
// console.log(binaryTree.levelOrder())
console.log(binaryTree.hasPathSum(null, 21))
// console.log(binaryTree.preOrderTraverseList)
// console.log(binaryTree.inOrderTraverseList)
// console.log(binaryTree.postOrderTraverseList)

// console.log(binaryTree.result)

/* -------------------------------------------- */
const data = [
  {
    name: 'a',
    children: [
      {
        name: 'b',
        children: [
          {
            name: 'e'
          }
        ]
      },
      {
        name: 'c',
        children: [{ name: 'f' }]
      },
      {
        name: 'd',
        children: [{ name: 'g' }]
      },
    ],
  },
  {
    name: 'a2',
    children: [
        { name: 'b2', children: [{ name: 'e2' }] },
        { name: 'c2', children: [{ name: 'f2' }] },
        { name: 'd2', children: [{ name: 'g2' }] },
    ],
}
]

function getName (data) {
  let result = []
  data.forEach(item => {
    let map = (data) => {
      result.push(data.name)
      data.children && data.children.forEach(item1 => map(item1))
    }
    map(item)
  })

  return result.join(',')
}

function getName2(data) {
  let result = [];
  let queue = data;
  while (queue.length > 0) {
      [...queue].forEach(child => {
          queue.shift();
          result.push(child.name);
          child.children && (queue.push(...child.children));
      });
  }
  return result.join(',');
}

// console.log(getName(data))
// console.log(getName2(data))


/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
  this.data = {}
};

/**
* Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
* @param {number} index
* @return {number}
*/
MyLinkedList.prototype.get = function(index) {
  if (index < 0) return -1
  let curr = this.data
  for (let i = 0; i < index; i++) {
      if (!curr.next) return -1
      curr = curr.next
  }
  
  return curr.val || -1
};

/**
* Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtHead = function(val) {
if (this.data && this.data.val) {
   this.data = { val, next: this.data }
} else {
   this.data = { val, next: null }
}
};

/**
* Append a node of value val to the last element of the linked list. 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtTail = function(val) {
  let curr = this.data
  while (curr.next) {
      curr = curr.next
  }
  curr.next = { val, next: null}
};

/**
* Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
* @param {number} index 
* @param {number} val
* @return {void}
*/
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index <= 0) return this.addAtHead(val)
  let curr = this.data
  for (let i = 0; i < index - 1; i++) {
      if (!curr || !curr.next) return null
      curr = curr.next
  }
  curr.next = { val, next: curr.next }
};

/**
* Delete the index-th node in the linked list, if the index is valid. 
* @param {number} index
* @return {void}
*/
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0) return null
  if (index === 0) return this.data = this.data.next
  let curr = this.data
  for (let i = 0; i < index - 1; i++) {
      if (!curr.next || !curr.next.next) return null
      curr = curr.next
  }
  if (!curr.next) return null
  if (!curr.next.next) return curr.next = null
  curr.next = curr.next.next
  console.log(this.data)
};

/**
* Your MyLinkedList object will be instantiated and called as such:
* var obj = new MyLinkedList()
* var param_1 = obj.get(index)
* obj.addAtHead(val)
* obj.addAtTail(val)
* obj.addAtIndex(index,val)
* obj.deleteAtIndex(index)
*/

var linkedList = new MyLinkedList()
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1); 
console.log(linkedList.get(1))