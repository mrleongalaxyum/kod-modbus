function getContent(fragmentId, callback){

    var pages = {
        home: "This is the Home page. Welcome to my site.",
        about: "This page will describe what my site is about",
        graphing: "Graphing part of the page <p> </p><iframe src=\"http://localhost:3000/d-solo/H3iLFJM4k/modbus-data?orgId=1&refresh=5s&from=1662715998923&to=1662716298923&panelId=2\" width=\"450\" height=\"200\" frameborder=\"0\"></iframe> "
    };

    callback(pages[fragmentId]);
}



function loadContent(){

    var contentDiv = document.getElementById("app"),
        fragmentId = location.hash.substr(1);

    getContent(fragmentId, function (content) {
        contentDiv.innerHTML = content;
    });

}

if(!location.hash) {
    location.hash = "#home";
}

loadContent();

window.addEventListener("hashchange", loadContent)