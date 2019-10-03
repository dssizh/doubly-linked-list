const Node = require('./node');

class LinkedList {

    constructor() {
        this.nodes = new Array();
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        if (this._head == null) {
            this._head = new Node(data, null, null);
            this._tail = this._head;
            this.nodes[this.length] = this._head;
        } else {
            let newNode = new Node(data, null, this._tail);
            this.nodes[this.length] = newNode;
            this._tail.prev = newNode;
            this._tail = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        return (this._head == null) ? null : this._head.data;
    }

    tail() {
        return (this._tail == null) ? null : this._tail.data;
    }

    at(index) {
        return (index < this.length) ? this.nodes[index].data : null;
    }

    insertAt(index, data) {
        if (this.length == 0) {
            this.append(data);
        } else {
            let oldNode = this.nodes[index];
            let newNode = new Node(data, oldNode, oldNode.next);

            if (oldNode.next != null) {
                oldNode.next.prev = newNode;
            }

            oldNode.next = newNode;

            this.nodes.splice(index, 0, newNode);
            this.length++;
            if (newNode.next == null) {
                this._head = newNode;
            }
        }
    }

    isEmpty() {
        return (this.length == 0) ? true : false;
    }

    clear() {
        this.nodes.length = 0;
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let node = this.nodes[index];
        if (node.prev != null) {
            node.prev.next = node.next;
        }
        if (node.next != null) {
            node.next.prev = node.prev;
        }
        this.nodes.splice(index, 1, node.prev);
        this.length--;
        return this;
    }

    reverse() {
        for (let i=0; i<this.length; i++) {
            let prev = this.nodes[i].prev;
            this.nodes[i].prev = this.nodes[i].next;
            this.nodes[i].next = prev;
        }

        this.nodes.reverse();

        let tempNode = this._head;
        this._head = this._tail;
        this._tail = tempNode;
        return this;
    }

    indexOf(data) {
        for (let i=0; i<this.length; i++) {
            if (this.nodes[i].data == data) {
                return i;
            }
        }
        return -1;
    }
}

module.exports = LinkedList;
