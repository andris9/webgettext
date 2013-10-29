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
/* global define: false, poparser: false, moparser: false, pocompiler: false, mocompiler: false, plurals: false */
(function(root, factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        define([
            "./poparser",
            "./moparser",
            "./pocompiler",
            "./mocompiler",
            "./plurals"
            ], factory);
    } else {
        root.poparser = factory(poparser, moparser, pocompiler, mocompiler, plurals);
    }

}(this, function(poparser, moparser, pocompiler, mocompiler, plurals) {

    "use strict";

    var webGettext = {

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

            return plurals[lang.languageCode || "en"] || plurals["en"];
        },

        findPluralForms: function(pluralRule){
            var canonical = (pluralRule || "").toLowerCase().replace(/[\s();]/g, ""),
                keys = Object.keys(plurals);

            for(var i = keys.length - 1; i>=0; i--){
                if((plurals[keys[i]].plurals || "").toLowerCase().replace(/[\s();]/g, "") == canonical){
                    return {
                        numbers: plurals[keys[i]].numbers,
                        plurals: plurals[keys[i]].plurals
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
        }
    };

    return webGettext;

}));
