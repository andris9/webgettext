# webgettext

**webgettext** is an AMD module for parsing and generating [gettext](https://www.gnu.org/software/gettext/) files in the browser (only Firefox by now) or in a browser like environment (ie. FirefoxOS). Currently only PO files are supported but MO support is on the way!

If you have downloaded/forked/cloned this repo, open [example/webgettext.html](example/webgettext.html) in your browser to check the features out. You can find some PO/MO files in the fixtures folder but any other PO/MO files should work as well.

## Usage

### Volo

Install with [volo](http://volojs.org/):

    volo add andris9/webgettext/master

## API

Currently only PO files are supported.

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

    poparser(translationTable) -> ArrayBuffer

Where

  * **translationTable** is an object in the same form as the output from `poparser`

`pocompiler` returns the resulting PO file as an ArrayBuffer.

**NB!** TextEncoder does not support anything but unicode charsets, so the output is always
encoded as UTF-8, no matter what the input defined.

**Example**

```javascript
var locale = {translations:{"": {"hello": {msgid:"hello", msgstr: ["tere"]}}}};
var po = pocompiler(locale);
storeArrayBufferToAFile(po);
```

## License

**MIT**