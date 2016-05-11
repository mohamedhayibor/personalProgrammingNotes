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
5/08
-------
Buffer overflow: while a program is writing data to a buffer, overruns the buffer's boundary and overwrites adjacent memory locations. (a major software vulnerability)

5/09
----
Intro to neural networks:

Machine learning's types of problems and tasks:

1. supervised learning: the computer is given example inputs and desired outputs.
2. unsupervised learning: No labels are given to the learning algorithm, leaving it on its own to find structure in its input. (potentially discovering hidden patterns in data)
3. reinforcement learning: A computer program interacts with a dynamic environment in which it must perform a certain goal.
4. develomental learning: learns its own inductive bias based on previous experience.

Neurons: basic unit of a neural network.

dendrites: inputs

axon: output


5/10
-------
A neural network learns by training: backpropagation.

The network would ideally start adjusting the weights. Run through many iteration until the ideal output and the one by the ouput considered small enough.

Gates: architectures that not only use neurons to make connections between each other but also regulate the information that flow through those connections. (Second order networks)

Long Short Term Memory: LSTM: an architechture well suited to learn from experience to classify process and predict time series when there are long time logs of unknown size between important events.

MLP: multilayer perceptrons: made of sigmoid neurons.

RNN: recurrent neural network: a class of artificial neural network where connections between units form a directed cycle.

> can use their internal memory to process arbitrary sequences of inputs. Unlike Feedforward n.n.

> examples tasks: handwriting recognition or speech recognition.

5/11
--------
stochastic gradient descent can be used to speed up learning. The idea is to estimate the gradient Delta C by computing Delta Cx for a small sample of randomly chosen inputs.

[nnr](http://neuralnetworksanddeeplearning.com/chap1.html)
