# webgettext

**webgettext** is an AMD module for parsing and generating [gettext](https://www.gnu.org/software/gettext/) files in the browser (only Firefox by now) or in a browser like environment (ie. FirefoxOS).

If you have downloaded/forked/cloned this repo, open [example/simple.html](example/simple.html) or  [example/editor.html](example/editor.html) (uses external resources from a CDN) in your browser to check the features out. You can find some PO/MO files in the fixtures folder but any other PO/MO files should work as well.

## Demo

### Gettext Editor

editor.html from the example folder can be tested [here](http://tahvel.info/webgettext/example/editor.html). This is a working editor - you can load .mo or .po files from your computer, edit translation strings (plural forms not supported though) and "download" updated translation file as .mo or .po.

More simple example can be tested [here](http://tahvel.info/webgettext/example/simple.html).

## Usage

### Volo

Install with [volo](http://volojs.org/):

    volo add andris9/webgettext/master

## API

## PO

## Parse PO files

Require [poparser.js](poparser.js) as `poparser` which gives you the following function

    poparser(fileContents[, defaultCharset]) -> Object

Where

  * **fileContents** is a String or an ArrayBuffer representing the PO file contents
  * **defaultCharset** (defaults to *iso-8859-1*) is the charset to use if the file content is an arraybuffer and there is no charset defined in the header of the PO file.

**NB!** if `fileContents` is a string, charset information is discarded.

`poparser` returns you a JSON compatible translation table object.

**Example**

```javascript
var po = getPoAsArrayBuffer("locale.po");
var locale = poparser(po);
console.log(locale.headers);
```

## Compile PO files

Once you have a translation table object, you can turn it into a PO file.

Require [pocompiler.js](pocompiler.js) as `pocompiler` which gives you the following function

    pocompiler(translationTable) -> ArrayBuffer

Where

  * **translationTable** is an object in the same form as the output from `poparser` or `moparser`

`pocompiler` returns the resulting PO file as an ArrayBuffer.

**NB!** TextEncoder does not support anything but unicode charsets, so the output is always
encoded as UTF-8, no matter what the input defined.

**Example**

```javascript
var locale = {translations:{"": {"hello": {msgid:"hello", msgstr: ["tere"]}}}};
var po = pocompiler(locale);
storeArrayBufferToAFile(po);
```

## MO

## Parse MO files

Require [moparser.js](moparser.js) as `moparser` which gives you the following function

    moparser(fileContents[, defaultCharset]) -> Object

Where

  * **fileContents** is an ArrayBuffer representing the MO file contents
  * **defaultCharset** (defaults to *iso-8859-1*) is the charset to use if there is no charset defined in the header of the MO file.

`moparser` returns you a JSON compatible translation table object.

**Example**

```javascript
var mo = getMoAsArrayBuffer("locale.mo");
var locale = moparser(mo);
console.log(locale.headers);
```

## Compile MO files

Once you have a translation table object, you can turn it into a MO file.

Require [mocompiler.js](mocompiler.js) as `mocompiler` which gives you the following function

    mocompiler(translationTable) -> ArrayBuffer

Where

  * **translationTable** is an object in the same form as the output from `poparser` or `moparser`

`mocompiler` returns the resulting MO file as an ArrayBuffer.

**NB!** TextEncoder does not support anything but unicode charsets, so the output is always
encoded as UTF-8, no matter what the input defined.

**Example**

```javascript
var locale = {translations:{"": {"hello": {msgid:"hello", msgstr: ["tere"]}}}};
var mo = mocompiler(locale);
storeArrayBufferToAFile(mo);
```

## License

**MIT**
