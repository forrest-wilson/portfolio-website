$(document).ready(function() {
    "use strict";
    
    //*******************//
    //**** Variables ****//
    //*******************//

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

    $(document).on("click", "#hamburgerButton", function() {
        toggleNav();
    });

    $(document).on("click", "#closeNavButton", function() {
        toggleNav();
    });
});