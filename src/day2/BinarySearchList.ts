export default function bs_list(haystack: number[], needle: number): boolean {
    return bs(haystack, needle, 0, haystack.length);
}

function bs(haystack: number[], needle: number, lo: number, hi: number): boolean {
    if (lo > hi) { throw Error("WTF"); }
    if (lo === hi) { return haystack[lo] === needle; }

    const mid = Math.floor((lo + hi) / 2);

    if (haystack[mid] === needle) { return true; }

    if (haystack[mid] > needle) {
        return bs(haystack, needle, lo, mid);
    }

    return bs(haystack, needle, mid + 1, hi);
}
