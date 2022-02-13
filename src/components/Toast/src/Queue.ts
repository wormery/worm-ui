export class Queue<E> {
  constructor(public items: E[] = []) {}

  // 向队列尾部添加元素
  enqueue(element: E) {
    this.items.push(element);
  }

  // 移除队列的第一个元素，并返回被移除的元素
  dequeue() {
    return this.items.shift();
  }

  // 返回队列的第一个元素
  front() {
    return this.items[0];
  }

  // 判断是否为空队列
  isEmpty() {
    return this.items.length === 0;
  }

  // 清空队列
  clear() {
    this.items = [];
  }

  // 获取队列的长度
  length() {
    return this.items.length;
  }

  // 打印队列里的元素
  toString() {
    return this.items.toString();
  }
}
