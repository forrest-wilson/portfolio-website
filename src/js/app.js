$(document).ready(function() {
    "use strict";
    
    //*******************//
    //**** Variables ****//
    //*******************//

    var transitionSpeed = 400;

    //*************************//
    //**** Event Functions ****//
    //*************************//

    function toggleNav() {
        $("#hamburgerButton").toggleClass("active-menu");
        $("#closeNavButton").toggleClass("active-menu");
        $("#mobileNavDropdown").toggleClass("is-open");
    }

    //************************//
    //**** Event Triggers ****//
    //************************//

    $("#hamburgerButton").on("click", function() {
        toggleNav();
    });

    $("#closeNavButton").on("click", function() {
        toggleNav();
    });
});