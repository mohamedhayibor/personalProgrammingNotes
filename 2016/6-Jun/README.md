6/8
------
process.nextTick : Once the current event loop runs to completion, call the callback function. (much more efficient than timers fire in subsequent ticks of the event loop)

6/9
--------
Helpful build scripts for electron apps [active-collab-desktop](https://github.com/nurtext/active-collab-desktop):

```json
"start": "electron .",
    "build": "npm run build-osx && npm run build-linux && npm run build-win32 && npm run build-win64",
    "build-osx": "electron-packager . \"$npm_package_productName\" --overwrite --out=dist --ignore='^/dist$' --ignore='^/media$' --prune --platform=darwin --arch=x64 --icon=media/Icon.icns --app-bundle-id=com.github.nurtext.active-collab-desktop --app-version=$npm_package_version --version=$npm_package_electronVersion && rm -rf \"dist/$npm_package_name-darwin-x64\" && mv \"dist/$npm_package_productName-darwin-x64\" \"dist/$npm_package_name-darwin-x64\" && cd \"dist/$npm_package_name-darwin-x64\" && zip -ryXq9 \"../$npm_package_name-osx-${npm_package_version}.zip\" \"$npm_package_productName.app\"",
    "build-linux": "electron-packager . \"$npm_package_name\" --overwrite --out=dist --ignore='^/dist$' --ignore='^/media/(?!Icon.png$).*' --prune --platform=linux --arch=x64 --app-bundle-id=com.github.nurtext.active-collab-desktop --app-version=$npm_package_version --version=$npm_package_electronVersion && cd \"dist/$npm_package_name-linux-x64/\" && zip -ryq9 \"../$npm_package_name-linux-$npm_package_version.zip\" *",
    "build-win32": "electron-packager . \"$npm_package_name\" --overwrite --out=dist --ignore='^/dist$' --ignore='^/media/(?!Icon.ico$).*' --prune --platform=win32 --arch=ia32 --icon=media/Icon.ico --version=$npm_package_electronVersion --version-string.ProductName=\"$npm_package_productName\" --version-string.FileDescription=\"$npm_package_description\" --version-string.LegalCopyright=\"$npm_package_license\" --version-string.ProductVersion=$npm_package_version && cd \"dist/$npm_package_name-win32-ia32/\" && mv $npm_package_name.exe \"$npm_package_productName.exe\" && zip -ryq9 \"../$npm_package_name-win-ia32-$npm_package_version.zip\" *",
    "build-win64": "electron-packager . \"$npm_package_name\" --overwrite --out=dist --ignore='^/dist$' --ignore='^/media/(?!Icon.ico$).*' --prune --platform=win32 --arch=x64 --icon=media/Icon.ico --version=$npm_package_electronVersion --version-string.ProductName=\"$npm_package_productName\" --version-string.FileDescription=\"$npm_package_description\" --version-string.LegalCopyright=\"$npm_package_license\" --version-string.ProductVersion=$npm_package_version && cd \"dist/$npm_package_name-win32-x64/\" && mv $npm_package_name.exe \"$npm_package_productName.exe\" && zip -ryq9 \"../$npm_package_name-win-x64-$npm_package_version.zip\" *",
    "build-win": "npm run build-win32 && npm run build-win64"

```

Quick centering tips with semantic ui:
> `ui center aligned grid`: center content in a grid colum

> `ui right floated image`: to float an image

hack to include jQuery in electron project:
```js
window.$ = window.jQuery = require('./scripts/jquery-2.1.1.min.js');
```
6/10
--------
[ngrok](https://ngrok.com/) commands
```
COMMANDS:
   authtoken	save authtoken to configuration file
   credits	prints author and licensing information
   http		start an HTTP tunnel
   start	start tunnels by name from the configuration file
   tcp		start a TCP tunnel
   test		test ngrok service end-to-end
   tls		start a TLS tunnel
   update	update ngrok to the latest version
   version	print the version string
   help		Shows a list of commands or help for one command
```
6/11
-------------
electron renderer process:

![](http://res.cloudinary.com/masteryoperation/image/upload/v1465662508/renderer_process_hezpv4.jpg)

![](http://res.cloudinary.com/masteryoperation/image/upload/v1465662508/rendermany_nxuiur.jpg)

source: github youtube presentation

6/14
-----
BLOB: Binary Large Object stored as a single entity in a database management system.

> Git Object: single key-value data store.

6/20
------
CMYK: (cyan, magenta, yellow, key): a substractive color model, used in color printing also used to describe the printing process.

Bitmap: a regular rectangular mesh of cells (pixels), containing a colour value. They contian two params:

1. number of pixels
2. information depth (colour depth) / pixels

Use case: used to represent images on the computer.

Uint8ClampedArray: represents an array of 8 bit unsigned integers clamped to 0-255. If a out-of-range value is specified it is replaced by 0 or 255. The contents are initialized to 0. Cannot change size after creation.

6/21
----------------
Fuzzy searching: approximate string matching: technique of finding strings that match a pattern rather than literally.

6/29
--------
A struct is complex data type declaration that defines a physical group of linked variables to be placed under one name in a block of memory.
