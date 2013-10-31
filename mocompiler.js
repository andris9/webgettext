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
/* global define: false, webgettext_shared: false, TextEncoder: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([
            "./webgettext_shared"
            ], factory);
    } else {
        root.moparser = factory(webgettext_shared);
    }

}(this, function(webgettext_shared) {

    "use strict";

    /**
     * Creates a MO compiler object. 
     *
     * @constructor
     * @param {Object} table Translation table as defined in the README
     */
    function Compiler(table){
        this._table = table || {};
        this._table.headers = this._table.headers || {};
        this._table.translations = this._table.translations || {};
        
        this._translations = [];

        /**
         * Endianness for reading int32 values, default little-endian
         */
        this._littleEndian = true;

        // TextEncoder only allows unicode charsets
        this._charset = "utf-8"; // this._table.charset || "utf-8"

        this._handleCharset();
    }

    /**
     * Magic bytes for the generated binary data
     */
    Compiler.prototype.MAGIC = 0x950412de;

    /**
     * Handles header values, replaces or adds (if needed) a charset property
     */
    Compiler.prototype._handleCharset = function(){
        var parts = (this._table.headers['content-type'] || "text/plain").split(";"),
            contentType = parts.shift(),
            charset = webgettext_shared.formatCharset(this._charset),
            params = [];

        params = parts.map(function(part){
            var parts = part.split("="),
                key = parts.shift().trim(),
                value = parts.join("=");

            if(key.toLowerCase() == "charset"){
                if(!charset){
                    charset = webgettext_shared.formatCharset(value.trim() || "utf-8");   
                }
                return "charset=" + charset;
            }

            return part;
        });

        if(!charset){
            charset = this._table.charset || "utf-8";
            params.push("charset=" + charset);
        }

        this._table.charset = charset;
        this._table.headers['content-type'] = contentType + "; " + params.join("; ");

        this._charset = charset;
    };

    /**
     * Generates an array of translation strings 
     * in the form of [{msgid:... , msgstr:...}]
     *
     * @return {Array} Translation strings array
     */
    Compiler.prototype._generateList = function(){
        var list = [];

        list.push({
            msgid: new ArrayBuffer(0),
            msgstr: new TextEncoder(this._charset).encode(webgettext_shared.generateHeader(this._table.headers)).buffer
        });

        Object.keys(this._table.translations).forEach((function(msgctxt){
            if(typeof this._table.translations[msgctxt] != "object"){
                return;
            }
            Object.keys(this._table.translations[msgctxt]).forEach((function(msgid){
                if(typeof this._table.translations[msgctxt][msgid] != "object"){
                    return;
                }
                if(msgctxt === "" && msgid === ""){
                    return;
                }

                var msgid_plural = this._table.translations[msgctxt][msgid].msgid_plural,
                    key = msgid,
                    value;

                if(msgctxt){
                    key = msgctxt + "\u0004" + key;
                }

                if(msgid_plural){
                    key += "\u0000" + msgid_plural;
                }

                value = [].concat(this._table.translations[msgctxt][msgid].msgstr || []).join("\u0000");

                list.push({
                    msgid: new TextEncoder(this._charset).encode(key).buffer, 
                    msgstr: new TextEncoder(this._charset).encode(value).buffer
                });
            }).bind(this));
        }).bind(this));

        return list;
    };

    /**
     * Calculate buffer size for the final binary object
     *
     * @param {Array} list An array of translation strings from _generateList
     * @return {Object} Size data of {msgid, msgstr, total}
     */
    Compiler.prototype._calculateSize = function(list){
        var msgidLength = 0, msgstrLength = 0, totalLength = 0;

        list.forEach(function(translation){
            msgidLength += translation.msgid.byteLength + 1; // + extra 0x00
            msgstrLength += translation.msgstr.byteLength + 1; // + extra 0x00
        });

        totalLength = 4 + // magic number
                      4 + // revision
                      4 + // string count
                      4 + // original string table offset
                      4 + // translation string table offset
                      4 + // hash table size
                      4 + // hash table offset
                      (4+4) * list.length + // original string table
                      (4+4) * list.length + // translations string table
                      msgidLength +  // originals
                      msgstrLength; // translations

        return {
            msgid: msgidLength,
            msgstr: msgstrLength,
            total: totalLength
        };
    };

    /**
     * Generates the binary MO object from the translation list
     *
     * @param {Array} list translation list
     * @param {Object} size Byte size information
     * @return {ArrayBuffer} Compiled MO object
     */
    Compiler.prototype._build = function(list, size){
        var returnBuffer = new DataView(new ArrayBuffer(size.total)),
            curPosition = 0,
            i, len;
        
        // magic
        returnBuffer.setUint32(0, this.MAGIC, this._littleEndian);
        
        // revision
        returnBuffer.setUint32(4, 0, this._littleEndian);
        
        // string count
        returnBuffer.setUint32(8, list.length, this._littleEndian);
        
        // original string table offset
        returnBuffer.setUint32(12, 28, this._littleEndian);
        
        // translation string table offset
        returnBuffer.setUint32(16, 28 + (4+4) * list.length, this._littleEndian);
        
        // hash table size
        returnBuffer.setUint32(20, 0, this._littleEndian);
     
        // hash table offset
        returnBuffer.setUint32(24, 28 + (4+4) * list.length, this._littleEndian);
        
        // build originals table
        curPosition = 28 + 2 * (4 + 4) * list.length;
        for(i=0, len = list.length; i < len; i++){
            webgettext_shared.bufferCopy(list[i].msgid, returnBuffer, curPosition);
            returnBuffer.setUint32(28 + i * 8, list[i].msgid.byteLength, this._littleEndian);
            returnBuffer.setUint32(28 + i * 8 + 4, curPosition, this._littleEndian);
            returnBuffer[curPosition + list[i].msgid.byteLength] = 0x00;
            curPosition += list[i].msgid.byteLength+1;
        }
            
        // build translations table
        for(i=0, len = list.length; i<len; i++){
            webgettext_shared.bufferCopy(list[i].msgstr, returnBuffer, curPosition);
            returnBuffer.setUint32(28 + (4 + 4) * list.length + i * 8, list[i].msgstr.byteLength, this._littleEndian);
            returnBuffer.setUint32(28 + (4+4) * list.length + i * 8 + 4, curPosition, this._littleEndian);
            returnBuffer[curPosition + list[i].msgstr.byteLength] = 0x00;
            curPosition += list[i].msgstr.byteLength + 1;
        }

        return returnBuffer;
    };

    /**
     * Compiles translation object into a binary MO object
     *
     * @return {Buffer} Compiled MO object
     */
    Compiler.prototype.compile = function(){
        var list = this._generateList(),
            size = this._calculateSize(list);

        // sort by msgid
        list.sort(function(a, b){
            if(a.msgid > b.msgid){
                return 1;
            }
            if(a.msgid < b.msgid){
                return -1;
            }
            return 0;
        });

        return this._build(list, size);
    };

    /**
     * Exposes general compiler function. Takes a translation
     * object as a parameter and returns binary MO object
     *
     * @param {Object} table Translation object
     * @return {Buffer} Compiled binary MO object
     */
    return function(table){
        var compiler = new Compiler(table);
        return compiler.compile().buffer;
    };

}));
