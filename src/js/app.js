$(document).ready(function() {
    "use strict";

    //**** Variables ****//

    var transitionSpeed = 400;

    //**** Event Functions ****//

    function showNav() {
        $("#mobileNavDropdown").fadeIn(transitionSpeed);
        $("#frame").addClass("blur");
    }

    function hideNav() {
        $("#mobileNavDropdown").fadeOut(transitionSpeed);
        $("#frame").removeClass("blur");
    }

    //**** Event Triggers ****//

    $("#hamburgerButton").on("click", function() {
        showNav();
    });

    $("#closeNavButton").on("click", function() {
        hideNav();
    });
});