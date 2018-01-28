$(document).ready(function() {
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

    //**** Events Triggers ****//

    $("#hamburgerButton").on("click", function() {
        showNav();
    });

    $("#closeNavButton").on("click", function() {
        hideNav();
    });
});