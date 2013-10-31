
require(["../webgettext"], function(webgettext){

    var curData = {},
        curFilename = false;

    document.getElementById("generatePo").addEventListener("click", function(e){
        webgettext.forceDownload(webgettext.pocompiler(curData), (curFilename || "locale") + ".po");
    });

    document.getElementById("generateMo").addEventListener("click", function(e){
        webgettext.forceDownload(webgettext.mocompiler(curData), (curFilename || "locale") + ".mo");
    });

    document.getElementById("sourceForm").addEventListener("submit", function(e){
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

            $("#edit-tab").tab("show");

            var body = document.querySelector("#strings tbody");
            body.innerHTML = "";

            Object.keys(data.translations).forEach(function(context){
                Object.keys(data.translations[context]).forEach(function(msgid){
                    if(context || msgid){
                        addRow(body, context, msgid, data.translations[context][msgid]);    
                    }
                });
            });

        });
    }, false);

    function addRow(body, context, msgid, data){
        var row = document.createElement("tr"),
            source = document.createElement("td"),
            translation = document.createElement("td"),

            sourceText = document.createElement("div"),
            translationText = document.createElement("div"),

            sourceEdit = document.createElement("textarea"),
            translationEdit = document.createElement("textarea"),

            closeButton = document.createElement("button");

        sourceText.style.cursor = "pointer";
        translationText.style.cursor = "pointer";

        sourceEdit.value = msgid;

        sourceEdit.className = "form-control";
        sourceEdit.rows = 4;

        translationEdit.className = "form-control";
        translationEdit.rows = 4;

        closeButton.className = "btn btn-default";
        closeButton.innerHTML = "Close and save";

        sourceEdit.style.display = "none";
        translationEdit.style.display = "none";
        closeButton.style.display = "none";

        sourceEdit.disabled = true;

        row.appendChild(source);
        row.appendChild(translation);

        sourceText.innerHTML = formatTableStr(data.msgid, 64) + (context ? " [ " + context + " ]" : "");
        translationText.innerHTML = formatTableStr([].concat(data.msgstr || [])[0], 64);

        source.appendChild(sourceText);
        source.appendChild(sourceEdit);

        translation.appendChild(translationText);
        translation.appendChild(translationEdit);
        translation.appendChild(closeButton);

        var rowVisible = false;

        row.addEventListener("click", function(e){

            e.preventDefault();

            if(rowVisible || e.target.tagName == "BUTTON"){
                return;
            }

            sourceText.style.display = "none";
            sourceEdit.style.display = "block";
            
            translationText.style.display = "none";
            translationEdit.style.display = "block";

            closeButton.style.display = "block";

            translationEdit.value = [].concat(data.msgstr || [])[0] || "";
            translationEdit.focus();

            rowVisible = true;

        }, false);

        closeButton.addEventListener("click", function(e){

            e.preventDefault();

            data.msgstr[0] = translationEdit.value;
            translationText.innerHTML = formatTableStr([].concat(data.msgstr || [])[0], 64);

            sourceText.style.display = "block";
            sourceEdit.style.display = "none";
            
            translationText.style.display = "block";
            translationEdit.style.display = "none";

            closeButton.style.display = "none";

            rowVisible = false;

        }, false);

        body.appendChild(row);
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