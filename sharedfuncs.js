// Copyright (c) 2013 Andris Reinman
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// AMD shim
/* jshint browser: true, nonstandard: true, strict: true */
/* global define: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.sharedfuncs = factory();
    }

}(this, function() {

    "use strict";

    var sharedfuncs = {};

    /**
     * Parses a header string into an object of key-value pairs
     *
     * @param {String} str Header string
     * @return {Object} An object of key-value pairs
     */
    sharedfuncs.parseHeader = function(str){
        var lines = (str || "").split("\n"),
            headers = {};

        lines.forEach(function(line){
            var parts = line.trim().split(":"),
                key = (parts.shift() || "").trim().toLowerCase(),
                value = parts.join(":").trim();
            if(!key){
                return;
            }
            headers[key] = value;
        });

        return headers;
    };

    /**
     * Convert first letters after - to uppercase, other lowercase
     *
     * @param {String} str String to be updated
     * @return {String} A string with uppercase words
     */
    sharedfuncs.upperCaseWords = function(str){
        return (str || "").toLowerCase().trim().replace(/^(MIME|POT?(?=\-)|[a-z])|\-[a-z]/gi, function(str){
            return str.toUpperCase();
        });
    };

    /**
     * Joins a header object of key value pairs into a header string
     *
     * @param {Object} header Object of key value pairs
     * @return {String} Header string
     */
    sharedfuncs.generateHeader = function(header){
        var lines = [];

        Object.keys(header || {}).forEach(function(key){
            if(key){
                lines.push(sharedfuncs.upperCaseWords(key) + ": " + (header[key] || "").trim());
            }
        });

        return lines.join("\n") + (lines.length ? "\n" : "");
    };

    /**
     * Normalizes charset name. Converts utf8 to utf-8, WIN1257 to windows-1257 etc.
     *
     * @param {String} charset Charset name
     * @return {String} Normalized charset name
     */
    sharedfuncs.formatCharset = function(charset, defaultCharset){
        return (charset || "iso-8859-1").toString().toLowerCase().
                replace(/^utf[\-_]?(\d+)$/, "utf-$1").
                replace(/^win(?:dows)?[\-_]?(\d+)$/, "windows-$1").
                replace(/^latin[\-_]?(\d+)$/, "iso-8859-$1").
                replace(/^(us[\-_]?)?ascii$/, "ascii").
                replace(/^charset$/, defaultCharset || "iso-8859-1").
                trim();
    };

    /**
     * Folds long lines according to PO format
     *
     * @param {String} str PO formatted string to be folded
     * @param {Number} [maxLen=76] Maximum allowed length for folded lines
     * @return {Array} An array of lines
     */
    sharedfuncs.foldLine = function(str, maxLen){

        maxLen = maxLen || 76;

        var lines = [],
            curLine = "",
            pos = 0,
            len = str.length,
            match;

        while(pos < len){
            curLine = str.substr(pos, maxLen);

            // ensure that the line never ends with a partial escaping
            // make longer lines if needed
            while(curLine.substr(-1) == "\\" && pos + curLine.length < len){
                curLine += str.charAt(pos + curLine.length);
            }

            // ensure that if possible, line breaks are done at reasonable places
            if((match = curLine.match(/\\n/))){
                curLine = curLine.substr(0, match.index + 2);
            }else if(pos + curLine.length < len){
                if((match = curLine.match(/(\s+)[^\s]*$/)) && match.index > 0){
                    curLine = curLine.substr(0, match.index + match[1].length);
                }else if((match = curLine.match(/([\x21-\x40\x5b-\x60\x7b-\x7e]+)[^\x21-\x40\x5b-\x60\x7b-\x7e]*$/)) && match.index > 0){
                    curLine = curLine.substr(0, match.index + match[1].length);
                }
            }

            lines.push(curLine);
            pos += curLine.length;
        }

        return lines;
    };

    /**
     * Copies an arraybuffer into another arraybuffer
     *
     * @param {ArrayBuffer} source Source buffer that will be copied into destination
     * @param {DataView} destination Destination DataView
     * @param {Number} destinationPos Start postition in the destination where to copy
     */
    sharedfuncs.bufferCopy = function(source, destination, destinationPos){
        destinationPos = destinationPos || 0;
        source = new Uint8Array(source);
        for(var i=0, len = source.byteLength; i < len; i++){
            destination.setUint8(destinationPos + i, source[i]);
        }
    };

    return sharedfuncs;
}));
