type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (this.length == 0) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0) return;

        if (idx === 0) return this.prepend(item);

        if (idx >= this.length - 1) return this.append(item);

        let curr = this.head;
        let prev = undefined;
        const node = { value: item } as Node<T>;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) {
            prev = curr;
        }

        if (!prev) {
            console.log('prev should exist');
            return;
        }

        node.next = curr;
        prev.next = node;

        this.length++;
        return;
    }

    append(item: T): void {
        let prev = this.head;
        const node = { value: item } as Node<T>;
        this.length++;

        for (; prev && prev.next != undefined; prev = prev.next) { }

        if (!prev) {
            this.head = node;
            return;
        }

        prev.next = node;
    }

    remove(item: T): T | undefined {
        let prev = undefined;
        let curr = this.head;

        for (; curr != undefined && curr.value != item; curr = curr.next) {
            prev = curr;
        }

        if (!curr) return undefined;

        this.length--;

        if (!prev) {
            this.head = curr.next;

            return item;
        }

        prev.next = curr.next;
        curr = undefined;

        return item;
    }

    get(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) { }

        if (!curr) return undefined;


        return curr.value;
    }

    removeAt(idx: number): T | undefined {
        let prev = undefined;
        let curr = this.head;

        for (let i = 0; i < idx && curr != undefined; i++, curr = curr.next) {
            prev = curr;
        }

        if (!curr) return undefined;

        this.length--;

        if (!prev) {
            let value = curr.value;
            this.head = curr.next;

            return value;
        }

        let value = curr.value;
        prev.next = curr.next;
        curr = undefined;

        return value;
    }
}
