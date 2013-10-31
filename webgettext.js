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
/* global define: false, poparser: false, moparser: false, pocompiler: false, mocompiler: false, plural_forms: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([
            "./poparser",
            "./moparser",
            "./pocompiler",
            "./mocompiler",
            "./plural_forms"
            ], factory);
    } else {
        root.webgettext = factory(poparser, moparser, pocompiler, mocompiler, plural_forms);
    }

}(this, function(poparser, moparser, pocompiler, mocompiler, plural_forms) {

    "use strict";

    var webgettext = {

        poparser: poparser,
        moparser: moparser,
        pocompiler: pocompiler,
        mocompiler: mocompiler,

        headerFields: {
            "Project-Id-Version": "The name and version of the package",
            "Report-Msgid-Bugs-To": "An email address or URL where you can report bugs in the untranslated strings",
            "POT-Creation-Date": "",
            "PO-Revision-Date": "Updated when the file is saved",
            "Last-Translator": "Your name and email address",
            "Language-Team": "The English name of the language, and the email address or homepage URL of the language team you are part of",
            "Language": "The language code of the language",
            "Content-Type": "",
            "Content-Transfer-Encoding": "8bit",
            "Plural-Forms": "Plural forms format"
        },

        getPluralForms: function(lang){
            lang = lang || {};
            var response = "";

            if(typeof lang == "string"){
                lang = this.parseLanguageCode(lang);
            }

            return plural_forms[lang.languageCode || "en"] || plural_forms["en"];
        },

        findPluralForms: function(pluralRule){
            var canonical = (pluralRule || "").toLowerCase().replace(/[\s();]/g, ""),
                keys = Object.keys(plural_forms);

            for(var i = keys.length - 1; i>=0; i--){
                if((plural_forms[keys[i]].plural_forms || "").toLowerCase().replace(/[\s();]/g, "") == canonical){
                    return {
                        numbers: plural_forms[keys[i]].numbers,
                        plural_forms: plural_forms[keys[i]].plural_forms
                    }
                }
            }

            return null;
        },

        parseLanguageCode: function(lang){
            lang = (lang || "").toString().trim();
            var parts = lang.match(/([^_.@]+)(?:_([^@.]+))?(?:@([^.]+))?(?:\.(.+))?/) || [];

            return {
                languageCode: (parts[1] || "").toLowerCase() || null,
                countryCode: (parts[2] || parts[1] || "").toUpperCase() || null,
                variant: (parts[3] || "").toLowerCase() || null,
                encoding: (parts[4] || "").toUpperCase() || null
            };
        },

        generatelanguageCode: function(lang){
            lang = lang || {};
            var response = "";

            if(typeof lang == "string"){
                lang = this.parseLanguageCode(lang);
            }

            if(lang.languageCode){
                response = lang.languageCode.toLowerCase();
                if(lang.countryCode && lang.countryCode.toLowerCase() != response){
                    response += "_" + lang.languageCode.toUpperCase();
                }
                if(lang.variant){
                    response += "@" + lang.variant.toLowerCase();
                }
            }

            return response;
        },

        loadFile: function(callback){
            var fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.addEventListener("change", function(e){
                e.preventDefault();

                if(!fileInput || !fileInput.files || !fileInput.files[0]){
                    fileInput = null;
                    return callback(null, false);
                }

                var reader = new FileReader();

                // run once the file has been loaded
                reader.onload = function(evt){
                    var fileName = fileInput.files[0].name,
                        fileType = fileInput.files[0].type;

                    reader = null;
                    fileInput = null;

                    callback(null, {
                        content: evt.target.result,
                        name: fileName,
                        type: fileType
                    });
                };

                reader.onerror = function(evt){
                    callback(new Error("File read error " + evt.target.error.code));
                };

                // start loading file
                reader.readAsArrayBuffer(fileInput.files[0]);
            }, false);
            fileInput.click();
        },

        forceDownload: function(arraybuffer, filename){
            var blob = new Blob([arraybuffer], {type:'application/octet-stream'}),
                url = URL.createObjectURL(blob),
                link = document.createElement("a");

            link.innerHTML = filename;
            link.href = url;
            link.download = filename;

            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0,
                false, false, false, false,
                0, null);
            link.dispatchEvent(e);
        },

        open: function(callback){
            this.loadFile((function(err, file){
                var data;
                
                if(err || !file){
                    return callback(new Error("Failed opening input file"));
                }

                try{
                    data = this.moparser(file.content);
                }catch(E){}

                if(!data){
                    try{
                        data = this.poparser(file.content);
                    }catch(E){}
                };
                
                if(!data){
                    return callback(new Error("Could not parse input file"));
                }

                return callback(null, data, file);
            }).bind(this));
        }
    };

    return webgettext;

}));
