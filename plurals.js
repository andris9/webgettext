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

// Gettext plural rules extracted from different sources

// AMD shim
(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(factory);
    } else {
        root.plurals = factory();
    }
}(this, function() {

    "use strict";

    return {
        "ach": {
            "name": "Acholi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "af": {
            "name": "Afrikaans",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ak": {
            "name": "Akan",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "am": {
            "name": "Amharic",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "an": {
            "name": "Aragonese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ar": {
            "name": "Arabic",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 0
                },
                {
                    "plural": 1,
                    "sample": 1
                },
                {
                    "plural": 2,
                    "sample": 2
                },
                {
                    "plural": 3,
                    "sample": 3
                },
                {
                    "plural": 4,
                    "sample": 11
                },
                {
                    "plural": 5,
                    "sample": 100
                }
            ],
            "plurals": "nplurals = 6; plural = (n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5)"
        },
        "arn": {
            "name": "Mapudungun",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "ast": {
            "name": "Asturian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ay": {
            "name": "Aymará",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "az": {
            "name": "Azerbaijani",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "be": {
            "name": "Belarusian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "bg": {
            "name": "Bulgarian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "bn": {
            "name": "Bengali",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "bo": {
            "name": "Tibetan",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "br": {
            "name": "Breton",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "brx": {
            "name": "Bodo",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "bs": {
            "name": "Bosnian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "ca": {
            "name": "Catalan",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "cgg": {
            "name": "Chiga",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "cs": {
            "name": "Czech",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)"
        },
        "csb": {
            "name": "Kashubian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "cy": {
            "name": "Welsh",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 3
                },
                {
                    "plural": 3,
                    "sample": 8
                }
            ],
            "plurals": "nplurals = 4; plural = (n == 1 ? 0 : n == 2 ? 1 : (n != 8 && n != 11) ? 2 : 3)"
        },
        "da": {
            "name": "Danish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "de": {
            "name": "German",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "doi": {
            "name": "Dogri",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "dz": {
            "name": "Dzongkha",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "el": {
            "name": "Greek",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "en": {
            "name": "English",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "eo": {
            "name": "Esperanto",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "es": {
            "name": "Spanish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "et": {
            "name": "Estonian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "eu": {
            "name": "Basque",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "fa": {
            "name": "Persian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "ff": {
            "name": "Fulah",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "fi": {
            "name": "Finnish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "fil": {
            "name": "Filipino",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "fo": {
            "name": "Faroese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "fr": {
            "name": "French",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "fur": {
            "name": "Friulian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "fy": {
            "name": "Frisian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ga": {
            "name": "Irish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 3
                },
                {
                    "plural": 3,
                    "sample": 7
                },
                {
                    "plural": 4,
                    "sample": 11
                }
            ],
            "plurals": "nplurals = 5; plural = (n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)"
        },
        "gd": {
            "name": "Scottish Gaelic",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 3
                },
                {
                    "plural": 3,
                    "sample": 20
                }
            ],
            "plurals": "nplurals = 4; plural = ((n == 1 || n == 11) ? 0 : (n == 2 || n == 12) ? 1 : (n > 2 && n < 20) ? 2 : 3)"
        },
        "gl": {
            "name": "Galician",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "gu": {
            "name": "Gujarati",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "gun": {
            "name": "Gun",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "ha": {
            "name": "Hausa",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "he": {
            "name": "Hebrew",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "hi": {
            "name": "Hindi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "hne": {
            "name": "Chhattisgarhi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "hr": {
            "name": "Croatian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "hu": {
            "name": "Hungarian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "hy": {
            "name": "Armenian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "id": {
            "name": "Indonesian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "is": {
            "name": "Icelandic",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n % 10 != 1 || n % 100 == 11)"
        },
        "it": {
            "name": "Italian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ja": {
            "name": "Japanese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "jbo": {
            "name": "Lojban",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "jv": {
            "name": "Javanese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 0
                },
                {
                    "plural": 1,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 0)"
        },
        "ka": {
            "name": "Georgian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "kk": {
            "name": "Kazakh",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "km": {
            "name": "Khmer",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "kn": {
            "name": "Kannada",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ko": {
            "name": "Korean",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "ku": {
            "name": "Kurdish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "kw": {
            "name": "Cornish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 3
                },
                {
                    "plural": 3,
                    "sample": 4
                }
            ],
            "plurals": "nplurals = 4; plural = (n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3)"
        },
        "ky": {
            "name": "Kyrgyz",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "lb": {
            "name": "Letzeburgesch",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ln": {
            "name": "Lingala",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "lo": {
            "name": "Lao",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "lt": {
            "name": "Lithuanian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 10
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "lv": {
            "name": "Latvian",
            "numbers": [
                {
                    "plural": 2,
                    "sample": 0
                },
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n != 0 ? 1 : 2)"
        },
        "mai": {
            "name": "Maithili",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "mfe": {
            "name": "Mauritian Creole",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "mg": {
            "name": "Malagasy",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "mi": {
            "name": "Maori",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "mk": {
            "name": "Macedonian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n == 1 || n % 10 == 1 ? 0 : 1)"
        },
        "ml": {
            "name": "Malayalam",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "mn": {
            "name": "Mongolian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "mni": {
            "name": "Manipuri",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "mnk": {
            "name": "Mandinka",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 0
                },
                {
                    "plural": 1,
                    "sample": 1
                },
                {
                    "plural": 2,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 0 ? 0 : n == 1 ? 1 : 2)"
        },
        "mr": {
            "name": "Marathi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ms": {
            "name": "Malay",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "mt": {
            "name": "Maltese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 11
                },
                {
                    "plural": 3,
                    "sample": 20
                }
            ],
            "plurals": "nplurals = 4; plural = (n == 1 ? 0 : n == 0 || ( n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20 ) ? 2 : 3)"
        },
        "my": {
            "name": "Burmese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "nah": {
            "name": "Nahuatl",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "nap": {
            "name": "Neapolitan",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "nb": {
            "name": "Norwegian Bokmal",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ne": {
            "name": "Nepali",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "nl": {
            "name": "Dutch",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "nn": {
            "name": "Norwegian Nynorsk",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "no": {
            "name": "Norwegian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "nso": {
            "name": "Northern Sotho",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "oc": {
            "name": "Occitan",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "or": {
            "name": "Oriya",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "pa": {
            "name": "Punjabi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "pap": {
            "name": "Papiamento",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "pl": {
            "name": "Polish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "pms": {
            "name": "Piemontese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ps": {
            "name": "Pashto",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "pt": {
            "name": "Portuguese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "rm": {
            "name": "Romansh",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ro": {
            "name": "Romanian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 20
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 1 ? 0 : (n == 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2)"
        },
        "ru": {
            "name": "Russian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "rw": {
            "name": "Kinyarwanda",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sah": {
            "name": "Yakut",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "sat": {
            "name": "Santali",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sco": {
            "name": "Scots",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sd": {
            "name": "Sindhi",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "se": {
            "name": "Northern Sami",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "si": {
            "name": "Sinhala",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sk": {
            "name": "Slovak",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n == 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)"
        },
        "sl": {
            "name": "Slovenian",
            "numbers": [
                {
                    "plural": 1,
                    "sample": 1
                },
                {
                    "plural": 2,
                    "sample": 2
                },
                {
                    "plural": 3,
                    "sample": 3
                },
                {
                    "plural": 0,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 4; plural = (n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0)"
        },
        "so": {
            "name": "Somali",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "son": {
            "name": "Songhay",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sq": {
            "name": "Albanian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sr": {
            "name": "Serbian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "su": {
            "name": "Sundanese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "sv": {
            "name": "Swedish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "sw": {
            "name": "Swahili",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "ta": {
            "name": "Tamil",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "te": {
            "name": "Telugu",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "tg": {
            "name": "Tajik",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "th": {
            "name": "Thai",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "ti": {
            "name": "Tigrinya",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "tk": {
            "name": "Turkmen",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "tr": {
            "name": "Turkish",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "tt": {
            "name": "Tatar",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "ug": {
            "name": "Uyghur",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "uk": {
            "name": "Ukrainian",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                },
                {
                    "plural": 2,
                    "sample": 5
                }
            ],
            "plurals": "nplurals = 3; plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)"
        },
        "ur": {
            "name": "Urdu",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "uz": {
            "name": "Uzbek",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "vi": {
            "name": "Vietnamese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "wa": {
            "name": "Walloon",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n > 1)"
        },
        "wo": {
            "name": "Wolof",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        },
        "yo": {
            "name": "Yoruba",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                },
                {
                    "plural": 1,
                    "sample": 2
                }
            ],
            "plurals": "nplurals = 2; plural = (n != 1)"
        },
        "zh": {
            "name": "Chinese",
            "numbers": [
                {
                    "plural": 0,
                    "sample": 1
                }
            ],
            "plurals": "nplurals = 1; plural = 0"
        }
    };

}));