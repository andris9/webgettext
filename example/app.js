require(["../sharedfuncs", "../poparser", "../pocompiler", "../moparser", "../mocompiler"], function(sharedfuncs, poparser, pocompiler, moparser, mocompiler) {

    window.parsePO = function(){
        var fileElm = document.getElementById("source");
        loadFile(fileElm, function(err, file){
            var data = poparser(file.content);
            log("Parsed from PO as JSON:\n" + JSON.stringify(data, false, 4));
            log("Compiled from JSON as PO:\n" + new TextDecoder("utf-8").decode(new Uint8Array(pocompiler(data))));
        });
    }

    window.parseMO = function(){
        var fileElm = document.getElementById("source");
        loadFile(fileElm, function(err, file){
            var data = moparser(file.content);
            log("Parsed from MO as JSON:\n" + JSON.stringify(data, false, 4));

            var compiled = mocompiler(data);
            log("Parsed from compiled MO:\n" + JSON.stringify(moparser(compiled), false, 4));
        });
    }

});

function log(str){
    var elm = document.getElementById("log");
    elm.innerHTML += str.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "\n\n";
}

function loadFile(fileElm, callback){
    var reader = new FileReader(),
        file = fileElm.files[0];

    // run once the file has been loaded
    reader.onload = function(evt){

        var fileData = {
            content: evt.target.result,
            name: file.fileName,
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
