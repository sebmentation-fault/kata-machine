type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head || !this.tail) {
            this.head = this.tail = node;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        let value = this.head.value;
        this.head = this.head.next;

        return value;
    }

    peek(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        return this.head.value;
    }
}
