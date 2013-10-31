require(["../webgettext_shared", "../poparser", "../pocompiler", "../moparser", "../mocompiler"], function(webgettext_shared, poparser, pocompiler, moparser, mocompiler) {

    window.parsePO = function(){
        var fileElm = document.getElementById("source");
        loadFile(fileElm, function(err, file){
            var data = poparser(file.content);
            log("Parsed from PO as JSON:\n" + JSON.stringify(data, false, 4));
            download(data);
        });
    }

    window.parseMO = function(){
        var fileElm = document.getElementById("source");
        loadFile(fileElm, function(err, file){
            var data = moparser(file.content);
            log("Parsed from MO as JSON:\n" + JSON.stringify(data, false, 4));
            download(data);
        });
    }

    function download(data){
        addDownload(pocompiler(data), "compiled.po");
        addDownload(mocompiler(data), "compiled.mo");
    }

});

function addDownload(buf, filename){
    var blob = new Blob([buf], {type:'application/octet-stream'}),
        url = URL.createObjectURL(blob),
        link = document.createElement("a");

    link.innerHTML = filename;
    link.href = url;
    link.style="display: block; margin: 5px 0;";
    link.download = filename;

    document.getElementById("downloads").appendChild(link);
}

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
