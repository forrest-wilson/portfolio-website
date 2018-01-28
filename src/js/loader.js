$(window).on("load", function() {
    $("#ajaxLoader").animate({opacity: 0.0}, 400, function() {
        setTimeout(function() {
            $("#ajaxLoader").css({
                display: "none"
            });
        }, 200);
    });
});