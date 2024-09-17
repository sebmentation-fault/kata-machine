export default class ArrayList<T> {
    public length: number;

    /** head points to an actual element */
    private head: number;
    /** tail points to a valid place or undefined if there is none / is full */
    private tail: number | undefined;
    private data: (T | undefined)[];
    private maxLength: number;

    constructor(length: number) {
        this.data = new Array(length).fill(undefined);
        this.head = this.tail = this.length = 0;
        this.maxLength = length;
    }

    prepend(item: T): void {
        // if we will overwrite tail, account for it
        if (this.length === this.maxLength) {
            throw Error("prepend overwrites tail");
        }

        this.head = this.modData(this.head - 1);
        this.data[this.head] = item;
        this.length++;

        if (this.head === this.tail) {
            this.tail = undefined;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0) return;
        if (idx === 0) return this.prepend(item);
        if (idx >= this.length - 1) return this.append(item);

        if (this.length === this.maxLength || this.tail === undefined) {
            throw Error("insert at on an already full arraylist");
        }

        this.shiftRightAfter(idx);
        this.length++;

        this.data[idx] = item;
    }

    append(item: T): void {
        // if we will overwrite head, account for it
        if (this.length === this.maxLength || this.tail === undefined) {
            throw Error("append overwrites head");
        }
        this.data[this.tail] = item;

        this.tail = this.modData(this.tail + 1);
        if (this.tail === this.head) {
            this.tail = undefined;
        }

        this.length++;
    }

    remove(item: T): T | undefined {
        let idx: number | undefined = undefined;
        for (let i: number = 0; i < this.maxLength; i++) {
            if (this.data[i] === item) {
                idx = i;
                break;
            }
        }

        if (idx === undefined) {
            return undefined;
        }

        this.shiftLeftAfter(idx);
        this.length--;

        return item;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            throw Error("index out of bounds");
        }

        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            throw Error("index out of bounds");
        }

        const value = this.data[idx];
        this.shiftLeftAfter(idx);
        this.length--;

        return value;
    }

    private shiftRightAfter(idx: number) {
        // do not want to overwrite tail, so start by shifting tail
        if (this.tail === undefined) {
            throw Error("shift right -- array is full");
        }

        const shiftCount = this.maxLength - idx;
        let curr = this.tail;

        for (let i: number = 0; i < shiftCount; i++) {
            const next = this.modData(curr + 1);
            this.data[next] = this.data[curr];
            curr = (curr - 1) % this.maxLength;
        }

        this.tail = this.modData(this.tail + 1);
        if (this.tail === this.head) {
            this.tail = undefined;
        }
    }

    private shiftLeftAfter(idx: number) {
        // we removed idx, so we can bring the tail list back to the main
        // we put undefined at old tail
        if (this.length === 0 || this.head === this.tail) {
            throw Error("shift left -- array is already empty");
        }

        const shiftCount = this.maxLength - 1 - idx;
        let curr = idx;

        for (let i: number = 0; i < shiftCount; i++) {
            const next = this.modData(curr + 1);
            this.data[curr] = this.data[next];
            curr = next;
        }

        if (this.tail === undefined) {
            this.tail = this.modData(this.head - 1);
            this.data[this.tail] = undefined;
        } else {
            this.tail = this.modData(this.tail - 1);
            this.data[this.tail] = undefined;
        }
    }

    private modData(n: number): number {
        if (n < 0) {
            n = this.maxLength + n;
        }
        n = n % this.maxLength;
        return n;
    }
}
