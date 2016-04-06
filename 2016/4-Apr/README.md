
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
