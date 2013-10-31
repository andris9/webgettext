
require(["../webgettext"], function(webgettext){

    var curData = {},
        curFilename = false;

    document.getElementById("generatePo").addEventListener("click", function(e){
        webgettext.forceDownload(webgettext.pocompiler(curData), (curFilename || "locale") + ".po");
    });

    document.getElementById("generateMo").addEventListener("click", function(e){
        webgettext.forceDownload(webgettext.mocompiler(curData), (curFilename || "locale") + ".mo");
    });

    document.getElementById("sourceForm").addEventListener("click", function(e){
        e.preventDefault();

        webgettext.open(function(err, data, file){
            if(err){
                alert(err.message);
                return;
            }

            curData = data;
            curFilename = file.name || "";
            curFilename = curFilename.split(".");
            curFilename.pop();
            curFilename = curFilename.join(".") || "";

            var pluralForms;
            if(data.headers.language){
                pluralForms = webgettext.getPluralForms(data.headers.language);
                data.headers.language = webgettext.generatelanguageCode(data.headers.language);
            }
            if(!pluralForms && data.headers["plural-forms"]){
                pluralForms = webgettext.findPluralForms(data.headers["plural-forms"])
            }
            if(pluralForms){
                data.headers["plural-forms"] = pluralForms.plural_forms;
            }

            document.getElementById("editor").style.display = "block";

            var rows = document.querySelectorAll("#strings tbody > tr"),
                tbody = document.querySelector("#strings tbody");

            Array.prototype.slice.call(rows).forEach(function(row){
                if(row && row.remove){
                    row.remove();
                }
            });

            rows = null;

            Object.keys(data.translations).forEach(function(context){
                Object.keys(data.translations[context]).forEach(function(msgid){
                    if(context || msgid){
                        addRow(tbody, context, msgid, data.translations[context][msgid]);    
                    }
                });
            });

        });
    }, false);

    function addRow(tbody, context, msgid, data){
        var row = tbody.querySelector('#translation-row').content.cloneNode(true),
            msgid = row.querySelector("textarea.msgid"),
            msgctx = row.querySelector(".msgctx"),
            msgstr = row.querySelector("textarea.msgstr");

        msgid.value = data.msgid;
        if(context){
            msgctx.innerHTML = formatTableStr(context);
            msgctx.className = "msgctx label label-info pull-right";
        }

        var translation = [].concat(data.msgstr || []);
        row.plural = 0;
        msgstr.value = translation[0];

        msgstr.addEventListener("focus", function(){
            msgstr.setAttribute("rows", "4");
            msgid.setAttribute("rows", "4");
        }, false);

        msgstr.addEventListener("blur", function(){
            data.msgstr[row.plural || 0] = msgstr.value;
            msgstr.setAttribute("rows", "1");
            msgid.setAttribute("rows", "1");
        }, false);

        tbody.appendChild(row);
    }

    function formatTableStr(str, len){
        str = (str || "").
            replace(/&/g, "&amp;").
            replace(/</g, "&lt;").
            replace(/>/g, "&gt;").
            replace(/\s+/g, " ").
            trim();

        if(str.length > len){
            str = str.substr(0, len).
                replace(/&[^;]*$/, "") + " ...";
        }
        return str;
    }
});