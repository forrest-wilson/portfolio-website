window.addEventListener("DOMContentLoaded", function() {
    $("header").load("modules/nav.html");
});

$(window).on("load", function() {
    $("#ajaxLoader").animate({opacity: 0.0}, 400, function() {
        setTimeout(function() {
            $("#ajaxLoader").css({
                display: "none"
            });
        }, 200);
    });
    $("#frame").css({
        display: "block"
    }).animate({opacity: 1}, 400);
});