require(
  ["../poparser", "../pocompiler", "../moparser", "../mocompiler"], 
  function(poparser, pocompiler, moparser, mocompiler) {

    var curData = {};

    document.getElementById("generatePo").addEventListener("click", function(e){
        download(pocompiler(curData), "locale.po");
    });

    document.getElementById("generateMo").addEventListener("click", function(e){
        download(mocompiler(curData), "locale.mo");
    });

    function download(buf, filename){
        var blob = new Blob([buf], {type:'application/octet-stream'}),
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
    }

    document.getElementById("sourceForm").addEventListener("submit", function(e){
        e.preventDefault();

        loadFile(document.getElementById("sourceFile"), function(err, file){
            var data;
            try{
                data = moparser(file.content);
            }catch(E){}
            if(!data){
                try{
                    data = poparser(file.content);
                }catch(E){}
            };
            
            if(!data){
                alert("Could not parse input file");
                return;
            }

            curData = data;

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

        sourceEdit.value = msgid;
        translationEdit.value = data.msgstr;

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

            translationEdit.focus();

            rowVisible = true;

        }, false);

        closeButton.addEventListener("click", function(e){

            e.preventDefault();

            data.msgstr = translationEdit.value;
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

    function loadFile(fileElm, callback){
        var reader = new FileReader(),
            file = fileElm.files[0];

        // run once the file has been loaded
        reader.onload = function(evt){

            var fileData = {
                content: evt.target.result,
                name: file.name,
                type: file.type
            };

            callback(null, fileData);
        };

        reader.onerror = function(evt){
            callback(new Error("File read error " + evt.target.error.code));
        };

        // start loading file
        reader.readAsArrayBuffer(file);
    }
});