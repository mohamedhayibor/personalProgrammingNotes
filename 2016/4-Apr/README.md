
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
Git squash: pushing a bunch of commits as a single pull request.

example squashing 5 commits
```
git rebase -i HEAD~5
```
