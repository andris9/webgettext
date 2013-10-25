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
/* global define: false, sharedfuncs: false, TextDecoder: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([
            "./sharedfuncs"
            ], factory);
    } else {
        root.moparser = factory(sharedfuncs);
    }

}(this, function(sharedfuncs) {

    "use strict";

    /**
     * Creates a MO parser object.
     *
     * @constructor
     * @param {ArrayBuffer} fileContents Binary MO object
     * @param {String} [defaultCharset] Default charset to use
     */
    function Parser(fileContents, defaultCharset){
        
        this._fileContents = new DataView(fileContents);
        
        /**
         * Endianness for reading int32 values, default little-endian
         */
        this._littleEndian = true;
        
        this._charset = defaultCharset || "iso-8859-1";

        this._table = {
            charset: this._charset,
            headers: undefined,
            translations: {}
        }; 
    }

    /**
     * Magic constant to check the endianness of the input file
     */
    Parser.prototype.MAGIC = 0x950412de;

    /**
     * Checks if number values in the input file are in big- or littleendian format.
     * 
     * @return {Boolean} Return true if magic was detected
     */
    Parser.prototype._checkMagick = function(){
        if(this._fileContents.getUint32(0, this._littleEndian) == this.MAGIC){
            this._littleEndian = true;
            return true;
        }else if(this._fileContents.getUint32(0, this._littleEndian) == this.MAGIC){
            this._littleEndian = false;
            return true;
        }else{
            return false;
        }
    };

    /**
     * Read the original strings and translations from the input MO file. Use the
     * first translation string in the file as the header.
     */
    Parser.prototype._loadTranslationTable = function(){
        var offsetOriginals = this._offsetOriginals,
            offsetTranslations = this._offsetTranslations,
            position, length,
            msgid, msgstr;
            
        for(var i = 0; i < this._total; i++){
            // msgid string
            length = this._fileContents.getUint32(offsetOriginals, this._littleEndian);
            offsetOriginals += 4;
            position = this._fileContents.getUint32(offsetOriginals, this._littleEndian);
            offsetOriginals += 4;
            msgid = this._fileContents.buffer.slice(position, position + length);
            
            // matching msgstr
            length = this._fileContents.getUint32(offsetTranslations, this._littleEndian);
            offsetTranslations += 4;
            position = this._fileContents.getUint32(offsetTranslations, this._littleEndian);
            offsetTranslations += 4;
            msgstr = this._fileContents.buffer.slice(position, position + length);
            
            if(!i && !msgid.length){
                this._handleCharset(msgstr);
            }
            
            msgid = new TextDecoder(this._charset).decode(new Uint8Array(msgid));
            msgstr = new TextDecoder(this._charset).decode(new Uint8Array(msgstr));

            this._addString(msgid, msgstr);
        }
        
        // dump the file contents object
        this._fileContents = null;
    };

    /**
     * Detects charset for MO strings from the header
     * 
     * @param {Buffer} headers Header value
     */
    Parser.prototype._handleCharset = function(headers){

        var headersStr = new TextDecoder("iso-8859-1").decode(new Uint8Array(headers)),
            match;
            
        if((match = headersStr.match(/[; ]charset\s*=\s*([\w\-]+)/i))){
            this._charset = this._table.charset = sharedfuncs.formatCharset(match[1], this._charset);
        }
        
        headers = new TextDecoder(this._charset).decode(new Uint8Array(headers));

        this._table.headers = sharedfuncs.parseHeader(headers);
    };

    /**
     * Adds a translation to the translation object
     *
     * @param {String} msgid Original string
     * @params {String} msgstr Translation for the original string
     */
    Parser.prototype._addString = function(msgid, msgstr){
        var translation = {}, parts, msgctxt, msgid_plural;

        msgid = msgid.split("\u0004");
        if(msgid.length > 1){
            msgctxt = msgid.shift();
            translation.msgctxt = msgctxt;
        }else{
            msgctxt = "";
        }
        msgid = msgid.join("\u0004");

        parts = msgid.split("\u0000");
        msgid = parts.shift();

        translation.msgid = msgid;

        if((msgid_plural = parts.join("\u0000"))){
            translation.msgid_plural = msgid_plural;
        }

        msgstr = msgstr.split("\u0000");
        translation.msgstr = [].concat(msgstr || []);
        
        if(!this._table.translations[msgctxt]){
            this._table.translations[msgctxt] = {};
        }
        
        this._table.translations[msgctxt][msgid] = translation;
    };

    /**
     * Parses the MO object and returns translation table
     *
     * @return {Object} Translation table
     */
    Parser.prototype.parse = function(){
        if(!this._checkMagick()){
            return false;
        }

        /**
         * GetText revision nr, usually 0
         */
        this._revision = this._fileContents.getUint32(4, this._littleEndian);
        
        /**
         * Total count of translated strings
         */
        this._total = this._fileContents.getUint32(8, this._littleEndian); 
        
        /**
         * Offset position for original strings table
         */
        this._offsetOriginals = this._fileContents.getUint32(12, this._littleEndian);
        
        /**
         * Offset position for translation strings table
         */
        this._offsetTranslations = this._fileContents.getUint32(16, this._littleEndian);

        // Load translations into this._translationTable
        this._loadTranslationTable();

        return this._table;
    };

    /**
     * Parses a binary MO object into translation table
     *
     * @param {Buffer} buffer Binary MO object
     * @param {String} [defaultCharset] Default charset to use
     * @return {Object} Translation object
     */
    return function(buffer, defaultCharset){
        var parser = new Parser(buffer, defaultCharset);
        return parser.parse();
    };

}));
