// 比较与二叉树区别，多了parent--链表
// 特点：查找O(log2N)

var TreeNode = function(data){
    this.data = data
    this.left = null
    this.right = null
    this.parent = null
}

function SearchTree() {
    var root = null

    this.insert = function(data){
        var newNode = new TreeNode(data)

        if (root == null) {
            root = newNode
            return
        }

        insertNode(root, newNode)
    }

    this.search = function(data){
        return searchNode(root, data)
    }

    this.delete = function(data){
        return deleteNode(root, data)
    }

    this.print = function() {
        console.log(root)
    }
}

const insertNode = function(node, newNode) {
    if(newNode.data < node.data) {
        if(node.left === null){
            node.left = newNode
            newNode.parent = node
            return true
        } else {
            insertNode(node.left, newNode)
        }
    } else if(newNode.data > node.data) {
        if(node.right === null){
            node.right = newNode
            newNode.parent = node
            return true
        }else{
            insertNode(node.right, newNode)
        }
    } else { // 如果相等,说明已经存在,不能再插入
        return false
    }
}  

const searchNode = function(node, data){
    if(node == null) return null

    if(data == node.data) {
        return node
    } else if (data < node.data) {
        return searchNode(node.left, data)
    } else {
        return searchNode(node.right, data)
    }
}

const deleteNode = function(node, data) {
    if(node == null) return null

    if(data == node.data) {
        // 三种情况， 无左右孩子，有左或右孩子，有左和右孩子
        if (node.left === null && node.right === null) {
            node = null
            return
        } 
        // 第二种
        var parent = node.parent
        if (node.left === null) {
            link_parent(parent, node, node.right)
            node.right.parent = parent
        }
        if (node.right === null) {
            link_parent(parent, node, node.left)
            node.left.parent = parent
        }
        // 第三种
        if (node.left && node.right) { // 找右孩子中序遍历的第一个元素, 与tree做比较不同
            var temp = node.right
            while(temp.left) {
                temp = temp.left
            }
            node.data = temp.data // 获取右树最小值
            deleteNode(node.right, temp.data) // 删除此节点
        }
    } else if (data < node.data) {
        deleteNode(node.left, data)
    } else {
        deleteNode(node.right, data)
    }
}
function link_parent(parent, node, nextNode) {
    if (parent === null) {
        root = nextNode
        root.parent = null
    }

    if (parent.left && parent.left.data === node.data) {
        parent.left = nextNode
    } else {
        parent.right = nextNode
    }
}

var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13, 11]
var searchTree = new SearchTree()
nodes.forEach(data => {
    searchTree.insert(data)
})

// console.log(searchTree.search(11))
console.log(searchTree.delete(14))
console.log(searchTree.print())