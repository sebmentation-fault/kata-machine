/**
 * quicksort:
 * - divide and conquer
 * - select pivot
 * - parition sub arrays
 */


function qsort(arr: number[], lo: number, hi: number): void {
    if (lo >= hi || lo < 0) {
        return;
    }
    if (hi >= arr.length) {
        console.log("FATAL ERR");
        return;
    }

    let p = partition(arr, lo, hi);

    qsort(arr, lo, p - 1);
    qsort(arr, p + 1, hi);
    return;
}

function partition(arr: number[], lo: number, hi: number): number {
    let pivot = arr[hi];
    let i = lo;

    for (let j = lo; j < hi; j++) {

        if (arr[j] <= pivot) {
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp
            i++;
        }

    }

    let tmp = arr[hi];
    arr[hi] = arr[i];
    arr[i] = tmp;
    return i;
}

export default function quick_sort(arr: number[]): void {
    qsort(arr, 0, arr.length - 1);
}
