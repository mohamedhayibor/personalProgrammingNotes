5/4
----
Priority queue: similar to a queue or stack, but where additionally each element has a "priority" associated with it.

> an element with high priority is served before the others.

Interface:

* insert with priority (argument)
* pull highest priority element

Dequeue: a generalization of both the FIFO queue and LIFO queue. A sequence of elements with a front and a back.

5/5
--------

Hash table: a data structure which store data in an associative manner.

Hashing: a technique used to convert  a range of key values into a range of indexes of an array.


###### Selection sort
```js
const swap = (array, leftIndex, rightIndex) => {
    let temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}

const selectionSort = (array) => {
    let len = array.length,
        tempIndex, i, j;
    for ( i = 0; i < len; i++) {
        tempIndex = i;
        for ( j = i + 1; j < len; j++) {
            if (array[tempIndex] > array[j]) {
                tempIndex = j;
            }
        }
        swap(array, i, tempIndex)
    }
    return array;
}

// running time O(n^2)
```

###### Insertion sort
```js
const insertionSort = (array) => {
    let toInsert, i, j,
        len = array.length;

    for (i = 0; i < len; i++) {
        toInsert = array[i];
        j = i;

        while ( j > 0 && toInsert < array[j-1] ) {
            array[j] = array[j - 1]
            j--;
        }
        array[j] = toInsert;
    }

    return array;
}
// running time: Worst case: O(n^2) || Best case: O(n)
```
