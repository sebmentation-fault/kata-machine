type Node<T> = {
    value: T,
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0) return;

        if (idx == 0) return this.prepend(item);

        if (idx >= this.length) return this.append(item);

        const node = { value: item } as Node<T>;
        this.length++;

        let curr = this.head;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) { }

        node.prev = curr;
        if (curr) {
            node.next = curr.next;
        }

        if (curr && curr.next) {
            curr.next.prev = node;
        }

        if (curr && curr.prev) {
            curr.prev.next = node;
        }
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        if (node.prev) {
            node.prev.next = node;
        }

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        for (; curr != undefined && curr.value != item; curr = curr.next) { }

        if (!curr) {
            return undefined;
        }

        if (curr === this.head) {
            this.head = this.head?.next;
        }

        if (curr === this.tail) {
            this.tail = this.tail?.next;
        }

        let value = curr.value;
        this.length--;

        if (curr.next) {
            curr.next.prev = curr.prev;
        }
        if (curr.prev) {
            curr.prev.next = curr.next;
        }
        curr = undefined;

        return value;
    }

    get(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) { }

        if (!curr) {
            return undefined;
        }

        return curr.value;
    }

    removeAt(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) { }

        if (!curr) {
            return undefined;
        }


        if (idx === 0) {
            this.head = this.head?.next;
        }

        if (idx >= this.length) {
            this.tail = this.tail?.prev;
        }

        this.length--;
        let value = curr.value;

        if (curr.next) {
            curr.next.prev = curr.prev;
        }
        if (curr.prev) {
            curr.prev.next = curr.next;
        }
        curr = undefined;

        return value;
    }
}
