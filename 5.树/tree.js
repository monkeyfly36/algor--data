// 二叉树

// 定义节点
function Node(data) {
    this.data = data
    this.left = null
    this.right = null
}

function BinaryTree() {
    this.root = null // 1.根结点 2.方便打印查看树结构

    // 创建树, 并插入节点
    var curNode = null // 闭包存储临时变量
    this.insert = function (data) {
        var newNode = new Node(data)
        if (this.root == null) {
            this.root = newNode
            curNode = this.root
            return
        }
        // 递归比较大小
        if (newNode.data < curNode.data) { // 插入左孩子
            if (curNode.left === null) {
                curNode.left = newNode
                curNode = this.root
                return
            } else {
                curNode = curNode.left
                this.insert(data)
            }
        } else {
            if (curNode.right === null) { // 插入右孩子
                curNode.right = newNode
                curNode = this.root
                return
            } else {
                curNode = curNode.right
                this.insert(data)
            }
        }
    }

    // 中序--先打印左, 再中, 再右--升序
    this.in_order = function (node) {
        if (node === null) {
            return
        }
        this.in_order(node.left)
        console.log(node.data)
        this.in_order(node.right)
    }
    // 前序--先打印中, 再左, 再右
    this.pre_order = function (node) {
        if (node === null) {
            return
        }
        console.log(node.data)
        this.pre_order(node.left)
        this.pre_order(node.right)
    }
    // 后序--先打印左, 再右, 再中
    this.back_order = function (node) {
        if (node === null) {
            return
        }
        this.back_order(node.left)
        this.back_order(node.right)
        console.log(node.data)
    }

    // 查找--最小值, 最大值, 是否存在--小于节点, 找左边;大于节点, 找右边;
    this.min = function (node) {
        if (node === null) {
            return null
        }

        while (node && node.left) {
            node = node.left
        }
        return node.data
    }
    this.max = function (node) {
        if (node === null) {
            return null
        }

        while (node && node.right) {
            node = node.right
        }
        return node.data
    }
    this.search = function (data) {
        var node = this.root
        return SearchNode(node, data)
    }
    // 删除节点
    this.remove = function (data) {
        var node = this.root
        return RemoveNode(node, data)
    }
    this.findMidNode = function (data) {

    }
}

function SearchNode (node, data) {
    if (node === null) {
        console.log('不存在')
        return false // ???不打印
    }

    if (data === node.data) {
        console.log('存在')
        return true  // ???不打印
    } else if (data < node.data) {
        node = node.left
        SearchNode(node, data)
    } else {
        node = node.right
        SearchNode(node, data)
    }
}
// 删除
function RemoveNode(node, data) {
    if (node === null) {
        return null
    }

    if (data < node.data) {
        node.left = RemoveNode(node.left, data)
        return node
    } else if (data > node.data) {
        node.right = RemoveNode(node.right, data)
        return node
    } else {
        // 删除叶子节点
        if (node.left === null && node.right === null) {
            node = null
            return node
        }
        // !删除子节点(含单个子节点)
        if (node.left === null) {
            node = node.right
            return node
        } else if (node.right === null) {
            node = node.left
            return node
        }
        // !!删除子节点(含两个子节点--三步走)
        var aux = findMinNode(node.right)
        node.data = aux.data
        node.right = RemoveNode(node.right, aux.data)
        return node
    }
}
function findMinNode(node) {
    if (node) {
        while (node && node.left !== null) {
            return node.left
        }
    }
    return null
}

/* --------------------------------------------- */
// 创建二叉树, 打印
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
var binaryTree = new BinaryTree()
nodes.forEach(data => {
    binaryTree.insert(data)
})

// 中序打印
var root = binaryTree.root
// binaryTree.in_order(root)
// 前序打印
// binaryTree.pre_order(root)
// 后序打印
// binaryTree.back_order(root)

// 查找打印
// console.log(binaryTree.min(root))
// console.log(binaryTree.max(root))
// console.log(binaryTree.search(4))

// 删除
binaryTree.remove(3)
console.log(root)