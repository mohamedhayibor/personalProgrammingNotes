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

5/12
--------------

Uset represents an unordered set of unique elements which mimic a mathematical set.

HMAC: Hash based Message Authentification code.

>  uses a cryptographic rkey in conjunction with a hash function.

(use case: can be used to prevent spamming)

Beam Search: a heuristic search algorithm (solving a problem more quickly when classic methods are too slow)

> explores a graph by expanding the most promising node in a limited set.

5/24
-------
Tips from [Sindresorhus awesome npm list](https://github.com/sindresorhus/awesome-npm/blob/master/readme.md)

### Update to the latest npm version

```
$ npm install --global npm
```

### Command aliases

- `npm i ` → `npm install`
- `npm i -S` → `npm install --save`
- `npm i -D` → `npm install --save-dev`
- `npm t` → `npm test`
- `npm it` → `npm install && npm test`
- `npm r` → `npm uninstall`

### Shell aliases

Speed up your common npm tasks.

In your `.zshrc`/`.bashrc`:

```sh
alias ni='npm install'
alias nis='npm install --save'
alias nid='npm install --save-dev'
alias nig='npm install --global'
alias nt='npm test'
alias nit='npm install && npm test'
alias nk='npm link'
alias nr='npm run'
alias nf='npm cache clean && rm -rf node_modules && npm install'
```


### Add to package.json when installing

You can have npm add packages to package.json when installing by specifying the `--save`/`-S` flag for `dependencies` and `--save-dev`/`-D` for `devDependencies`:

```
$ npm install --save chalk
```

### Run scripts

You can easily [run scripts](https://docs.npmjs.com/cli/run-script) using npm by adding them to the `"scripts"` field in package.json and run them with `npm run <script-name>`. Run `npm run` to see available scripts. Binaries of locally install packages are made available in the [PATH](https://en.wikipedia.org/wiki/PATH_(variable)), so you can run them by name. `npm run foo` will also run `prefoo` and `postfoo` if defined.

```json
{
	"name": "awesome-package",
	"scripts": {
		"cat": "cat-names"
	},
	"dependencies": {
		"cat-names": "^1.0.0"
	}
}
```

```
$ npm run cat
Max
```

All package.json properties are [exposed](https://docs.npmjs.com/misc/scripts#packagejson-vars) as environment variables:

```json
{
	"name": "awesome-package",
	"scripts": {
		"name": "echo $npm_package_name"
	}
}
```

```
$ npm run name
awesome-package
```


### Link local packages

Sometimes it can be useful to have a local version of a package as a dependency. You can use `npm link` to link one local package into another. Run `npm link` in the package you want to use. This creates a global reference. Then go into your original package and run `npm link <package-name>` to link in the other package.

```
$ cd rainbow
$ npm link
$ cd ../unicorn
$ npm link rainbow
```

You can now use `rainbow` as a dependency in the `unicorn` package.

### Install a package from GitHub

npm supports using a shorthand for installing a package directly from a GitHub repo:

```
$ npm install sindresorhus/chalk
```

Let's target a specific commit as master is a moving target:

```
$ npm install 'sindresorhus/chalk#51b8f32'
```

Specify either a commit SHA, branch, tag, or nothing.


### Install a specific version of a package

```
$ npm install chalk@1.0.0
```


### List top-level installed packages and their version

```
$ npm ls --depth=0
```

### Command help

Get help docs for a command:

```
$ npm help <command>
```

Example:

```
$ npm help install
```

### Standalone version of a package

Quickly get a standalone version of a package that is browserified and usable in the browser.

```
https://wzrd.in/standalone/<package-name>[@<version>]
```
