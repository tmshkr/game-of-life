class Node {
  constructor(matrix, gen) {
    this.matrix = matrix;
    this.gen = gen;
    this.next = null;
    this.prev = null;
  }
}

class History {
  constructor(matrix) {
    const node = new Node(matrix, 0);
    this.head = node;
    this.tail = node;
    this.current = node;
    this.length = 1;
    this.limit = 100;
  }

  enqueue(matrix) {
    if (this.current !== this.head) {
      this.head = this.current;
    }
    const node = new Node(matrix, this.current.gen + 1);
    const oldHead = this.head;
    oldHead.next = node;
    node.prev = oldHead;
    this.current = node;
    this.head = node;
    this.length++;
    if (this.length > this.limit) {
      this.dequeue();
    }
    return node;
  }

  dequeue() {
    const oldTail = this.tail;
    oldTail.next.prev = null;
    this.tail = oldTail.next;
    oldTail.next = null;
    this.length--;
    return oldTail;
  }

  replace(matrix) {
    this.current.matrix = matrix;
    this.current.next = null;
    this.head = this.current;
    return this.current;
  }

  goBack() {
    if (this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current;
  }

  goForward() {
    if (this.current.next) {
      this.current = this.current.next;
    }
    return this.current;
  }
}

export default History;
