export default function asyncIterator<T> (array: T[], cb: (element: T, index: number) => boolean, after: () => void, i=0) {
    setTimeout(() => {
        const stopIter = cb(array[i], i);

        if (stopIter || i == array.length - 1) {
            after();
            return;
        }

        asyncIterator(array, cb, after, i+1);
    }, 0);
}
