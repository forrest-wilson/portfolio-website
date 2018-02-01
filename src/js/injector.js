//***********************************//
//**** Module Injector JS Script ****//
//***********************************//

(function() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "ajaxLoader");
    loader.setAttribute("class", "ajax-loader");

    var img = document.createElement("img");
    img.setAttribute("class", "ajax-image");
    img.setAttribute("src", "./assets/images/ripple.svg");
    img.setAttribute("alt", "Ajax Loader");

    loader.appendChild(img);

    window.addEventListener("DOMContentLoaded", function() {
        document.querySelector("body").appendChild(loader);
    });
})();