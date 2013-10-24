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
/* global define: false, sharedfuncs: false, TextEncoder: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([
            "./sharedfuncs"
            ], factory);
    } else {
        root.poparser = factory(sharedfuncs);
    }

}(this, function(sharedfuncs) {

    "use strict";

    /**
     * Creates a PO compiler object.
     *
     * @constructor
     * @param {Object} table Translation table to be compiled
     */
    function Compiler(table){
        // we are going to manipulate the translation object, so lets make a copy of it
        this._table = JSON.parse(JSON.stringify(table || {}));
        this._table.headers = this._table.headers || {};
        this._table.translations = this._table.translations || {};

        this._translations = [];

        // TextEncoder only allows unicode charsets
        this._charset = "utf-8"; // this._table.charset || "utf-8"
        this._handleCharset();
    }

    /**
     * Converts a comments object to a comment string. The comment object is
     * in the form of {translator:"", reference: "", extracted: "", flag: "", previous:""}
     *
     * @param {Object} comments A comments object
     * @return {String} A comment string for the PO file
     */
    Compiler.prototype._drawComments = function(comments){
        var lines = [];
        var types = [
            {
                key: "translator",
                prefix: "# "
            },
            {
                key: "reference",
                prefix: "#: "
            },
            {
                key: "extracted",
                prefix: "#. "
            },
            {
                key: "flag",
                prefix: "#, "
            },
            {
                key: "previous",
                prefix: "#| "
            }
        ];

        types.forEach(function(type){
            if(!comments[type.key]){
                return;
            }
            comments[type.key].split(/\r?\n|\r/).forEach(function(line){
                lines.push(type.prefix + line);
            });
        });

        return lines.join("\n");
    };

    /**
     * Builds a PO string for a single translation object
     *
     * @param {Object} block Translation object
     * @param {Object} [override] Properties of this object will override `block` properties
     * @return {String} Translation string for a single object
     */
    Compiler.prototype._drawBlock = function(block, override){

        override = override || {};

        var response = [],
            comments = override.comments || block.comments,
            msgctxt = override.msgctxt || block.msgctxt,
            msgid = override.msgid || block.msgid,
            msgid_plural = override.msgid_plural || block.msgid_plural,
            msgstr = [].concat(override.msgstr || block.msgstr);


        // add comments
        if(comments && (comments = this._drawComments(comments))){
            response.push(comments);
        }

        if(msgctxt){
            response.push(this._addPOString("msgctxt", msgctxt));
        }

        response.push(this._addPOString("msgid", msgid || ""));

        if(msgid_plural){
            response.push(this._addPOString("msgid_plural", msgid_plural));
        }

        if(msgstr.length <= 1){
            response.push(this._addPOString("msgstr", msgstr[0] || ""));
        }else{
            msgstr.forEach((function(msgstr, i){
                response.push(this._addPOString("msgstr["+i+"]", msgstr || ""));
            }).bind(this));
        }

        return response.join("\n");
    };

    /**
     * Escapes and joins a key and a value for the PO string
     *
     * @param {String} key Key name
     * @param {String} value Key value
     * @return {String} Joined and escaped key-value pair
     */
    Compiler.prototype._addPOString = function(key, value){
        var line;

        key = (key || "").toString();

        // escape newlines and quotes
        value = (value || "").toString().
                replace(/\\/g, "\\\\").
                replace(/\"/g, "\\\"").
                replace(/\t/g, "\\t").
                replace(/\r/g, "\\r").
                replace(/\n/g, "\\n");

        var lines = sharedfuncs.foldLine(value);

        if(lines.length < 2){
            return key + " \"" + (lines.shift() || "") + "\"";
        }else{
            return key + " \"\"\n\"" + lines.join("\"\n\"") + "\"";
        }

        if(value.match(/\n/)){
            value = value.replace(/\n/g, "\\n\n").replace(/\n$/, "");
            line = ("\n"+value).split("\n").map(function(l){
                return '"' + l + '"';
            }).join("\n");
        }else{
            line = '"' + value + '"';
        }

        return key + " " + line;
    };

    /**
     * Handles header values, replaces or adds (if needed) a charset property
     */
    Compiler.prototype._handleCharset = function(){
        var parts = (this._table.headers['content-type'] || "text/plain").split(";"),
            contentType = parts.shift(),
            charset = sharedfuncs.formatCharset(this._charset),
            params = [];

        params = parts.map(function(part){
            var parts = part.split("="),
                key = parts.shift().trim(),
                value = parts.join("=");

            if(key.toLowerCase() == "charset"){
                if(!charset){
                    charset = sharedfuncs.formatCharset(value.trim() || "utf-8");
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
    };

    /**
     * Compiles translation object into a PO object
     *
     * @return {ArrayBuffer} Compiled PO object
     */
    Compiler.prototype.compile = function(){

        var response = [],
            headerBlock = this._table.translations[""] && this._table.translations[""][""] || {};

        response.push(this._drawBlock(headerBlock, {msgstr: sharedfuncs.generateHeader(this._table.headers)}));

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

                response.push(this._drawBlock(this._table.translations[msgctxt][msgid]));
            }).bind(this));
        }).bind(this));

        return new TextEncoder(this._charset).encode(response.join("\n\n")).buffer;
    };

    /**
     * Exposes general compiler function. Takes a translation
     * object as a parameter and returns PO object
     *
     * @param {Object} table Translation object
     * @return {ArrayBuffer} Compiled PO object
     */
    return function(table){
        var compiler = new Compiler(table);
        return compiler.compile();
    };
}));
