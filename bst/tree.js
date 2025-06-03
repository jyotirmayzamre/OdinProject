import Node from "./node";

export default class Tree {
    constructor(arr){
        const sortedArray = [...new Set(arr)].sort((a, b) => a-b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(arr){
        if(arr.length === 0) return null;
        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);
        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));
        return root;
    }

    insert(value, curr = this.root){
        if(!curr){ 
           return  new Node(value);
        }
        if (curr.val === value){
            return;
        }

        if (value < curr.val){
            curr.left = this.insert(value, curr.left);
        } else {
            curr.right = this.insert(value, curr.right);
        }
        return curr;
    }

    getSucc(curr){
        curr = curr.right;
        while(curr && curr.left){
            curr = curr.left;
        }
        return curr;
    }

    deleteItem(value, curr = this.root){
        if(!curr) return curr;

        if(curr.val > value){
            curr.left = this.deleteItem(value, curr.left);
        } else if (curr.val < value){
            curr.right = this.deleteItem(value, curr.right);
        } else {
            if(!curr.left) return curr.right;
            if(!curr.right) return curr.left;

            let succ = this.getSucc(curr);
            curr.val = succ.val;
            curr.right = this.deleteItem(curr.right, succ.value);
        }
        return curr;
    }

    find(curr = this.root, value){
        if(!curr || curr.val == value){
            return curr;
        } else if (curr.val < value){
            return this.find(curr.right, value);
        } else {
            return this.find(curr.left, value);
        }
    }

    levelOrder(callback){
        let queue = [this.root];
        let list = [];
        while(queue.length > 0){
            let visited = queue.shift();
            callback ? callback(visited) : list.push(visited.val);
            if(visited.left) queue.push(left);
            if(visited.right) queue.push(right);
        }
        return list;
    }

    inOrder(callback, node=this.root, list = []){
        if(!node) return;
        this.inOrder(callback, node.left, list);
        callback ? callback(node) : list.push(node.val);
        this.inOrder(callback, node.right, list);

        return list;
    }

    preOrder(callback, node=this.root, list = []){
        if(!node) return;
        callback ? callback(node) : list.push(node.val);
        this.preOrder(callback, node.left, list);
        this.preOrder(callback, node.right, list);

        return list;
    }

    postOrder(callback, node=this.root, list = []){
        if(!node) return;
        this.postOrder(callback, node.left, list);
        this.postOrder(callback, node.right, list);
        callback ? callback(node) : list.push(node.val);

        return list;
    }

    height(node = this.root){
        if(!node) return 0;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value, node = this.root, count){
        if(!node) return;
        if(node.val == value) return count;
        if(value < node.val){
            return this.depth(value, node.left, count+1);
        } else {
            return this.depth(value, node.right, count+1);
        }
    }

    isBalanced(node = this.root){
        if(!node) return true;
        const diff = Math.abs(this.height(node.left) - this.height(node.right));
        return diff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance(){
        const list = this.inOrder();
        this.root = this.buildTree(list);
    }

    
}