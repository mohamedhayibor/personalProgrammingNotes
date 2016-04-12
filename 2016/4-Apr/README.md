
4/1 (Finally got some momentum, let's kill it!!!)
------
###### More css rule patterns

* X:visited and X:link
:link pseudo to target links not clicked yet, :visited for the ones clicked
```
a: link { color: red; }
a: visited { color: purple; }
```

* X > Y
will only select direct children
```
div#container > ul {
  border: 1px solid black;
}
```

* X ~ Y: less strict version X + Y
```
ul ~ p {
   color: red;
}
```

* X[title]: will select the anchor tags that have a title attribute:
```
a[title] {
   color: green;
}
```

* X[href$=".jpg"]: searching for all anchors which link to an image:
```
a[href$=".jpg"] {
   color: red;
}
```

* X: checked : will only target a ui element that has been checked:
```
input[type=radio]: checked {
  border: 1px solid black;
}
```

* X: after/ before : generate content around the selected element.

* X:hover
```
div:hover {
  background: #e3e3e3;
}
```
* X:not(selector) : negation

``` 
div:not(#container) {
   color: blue;
}
```
[codeTutsplus](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

4/2
---------
Git squash: pushing a bunch of commits as a single commit (use case: for a pr).

example squashing 5 commits
```
git rebase -i HEAD~5
```
Reasons to use git rebase:
1. edit previous commit messages.
2. squashing.
3. Delete or revert commits that are no longer necessary.

Rebasing commits against a branch:
```
git rebase -i `otherBranchName`
```

Commands available while rebasing:
* pick: to include commit (delete entire line to not include commit).
* reword: like pick, but the rebase process will pause and give you the chance to alter the commit message.
* edit: you'll get the chance to add or change the commit entirely. (also allows you to to split a large commit into smaller ones)
* squash: (see example above), gives you the chance to write a new commit message.
* fixup: similar to squash, but the commit to be merged has its message discarded.
* exec: lets you run arbitrary shell commands against a commit.

Since rebase changes the git history, rather than `git push origin` use:
```
git push origin master --force
```

4/3
-----
Quick dive into building a chrome extension:

1. create a `manifest.json` file
2. Set up minimum resources: icon.png and popup.html (enabled with popup.js)
3. Load the extension: `load unpacked extension` via extensions developer mode
4. Set up trigger action with manifest.json file

```json
{
  ...
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html",
    "default_title": "Click here!"
  },
  ...
}

```
[Chrome ext api](https://developer.chrome.com/extensions/api_index)

4/4
----
Event.target: a reference to the object that dispatched the event. (can be used for event delegation).

example: hiding an element when a click event fires:
```js
function hide(e) {
  e.target.style.visibility = 'hidden';
}
// adding listener
element.addEventListener('click', hide, false);
```
4/5
----
To add a listener when dealing with the DOM, we can use a method called addEventListener:

```js
// with unanimous callback
var button = document.querySelector("button");
button.addEventListener("click", function () {
	console.log("a click event fired");
})
```
###### Performance & Memory issues:
> It is preferable to use named function instead unanonimous ones so that .removeEventListener() can be used to detach the event.

```js
Element.removeEventListener('click', listener, false);
```

When looping an unanonimous function will be recreated every single time, which can be a performance issue.

4/6
----
A Hash function is any function that can be used to data of arbitrary size to data of fixed size (returned values are called hash values, hash codes, hash sums or hashes).

A hash table is used for quick lookup (accelerate table or database lookup by detecting duplicated records in a large file)

Properties:

1. Deterministic: for a given input it must always generate the same hash value.
2. Uniformity: should map the expected inputs as evenly as possible over its output range.
3. Defined range: (ie output that is constrained to 32 bit integer values can be used to index an array).
4. Data normalization
5. Continuity
6. Non-invertible: (impossible to reconstruct the input values from hash values)

4/7
----

Hash function algorithms: (Mostly depends on the nature of the input data and the normal distribution of the application)

> a perfect hash function: maps each input to a different hash value. (injective)

######z-index (css)
property specifies the z-order of an element and its descendants. An element with a higher z-index usually covers another with a lesser one.

For a positioned box: the z index specifies:

1. The stack level of the box in the current stacking context
2. Whether the box establishes a local stacking context

> Stacking context: a the 3-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user.

4/08
-------
The location interface represents the location URL of the object is linked to. Changes done on it are reflected on the object it relates to.

Properties:

* Location.href > a DOMString containing the entire url.
* Location.hostname > a DOMString containing the domain url.
* Location.username / .password > a DOMString containing the username/password specified before the domain name.

Methods:

Location.assign() method causes the window to load and display the document at the URL specified.
```js
document.location.assign('https://google.com');
```

The Location.reload() method reloads from the current URL. example:
```js
document.location.reload(true)
```

4/9
----
Microservices: a software achitechture in which complex applications are composed of small, independent processes communicating with each other using using language agnositc Apis.

> small building blocks, highly decoupled and focussed on doing a small task well (unix philosophy)

properties:

1. Easy to replace
2. Organized around capabilities
3. Architectures are symetrical rather than hierarchical
4. 

4/10
-------
codebase: a single or set of repositories who share a root commit (in a decentralized revision control system).

a distributed system: multiple codebases. (each component in a D.S. is an app)

a deploy: a running instance of the app.

> one codebase per app. Many deploys of the app.

App's config: everything that is likely to vary between deploy's (staging, production, developer environments)

> strict separation of config from code.  (config varies substantially across deploys, code does not)

Litmus test: can the codebase be open sourced without compromising any credentials.

> store config in environment variables.

A backing service is any service the app consumes over the network as part of its normal operation.

A codebase is transformed into a deploy through 3 stages:

1. Build stage: converts a code repo into an executable bundle known as a build.
2. Release stage: the build produced by the build stage and combines it with the deploy's current config.
3. Run stage: (runtime) runs the app in the execution environment.

Processes: execute the app as one or more stateless processes.

> Any data that need to persist must be stored in a stateful backing service (ie database)

Port binding: the web app exports HTTP as a service by binding to a port.

Disposability: (can be started or stopped at a moment's notice)

Maximize robustness with fast startup and graceful shutdown.

* Processes should strive to minimize startup time.
* shut down gracefully when they receive a SIGTERM. (for instance: ceasing to listen on the service port)

[12 factor app](http://12factor.net/)

4/11
-------

SOA: service oriented architecture (SOA): architectural pattern in which application components provide services to other components via a communication protocol.

npm onsite soa example:
![im](http://res.cloudinary.com/masteryoperation/image/upload/v1460432872/Screen_Shot_2016-04-11_at_11.45.32_PM_hp3ojh.png)

a trie: digital tree or (radix || prefix tree: can be searched by prefixes) is an ordered tree data structure used to store a dynamic set of associative array where the keys are usually strings. 
