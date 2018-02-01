$(document).ready(function() {
    "use strict";
    
    //*******************//
    //**** Variables ****//
    //*******************//

    //*******************//
    //**** Functions ****//
    //*******************//

    //*************************//
    //**** Event Functions ****//
    //*************************//

    function toggleNav() {
        $("#hamburgerButton").toggleClass("active-menu");
        $("#mobileNavDropdown").slideToggle(400, "easeInOutQuart");
    }

    //************************//
    //**** Event Triggers ****//
    //************************//

    $(document).on("click", "#hamburgerButton", function() {
        toggleNav();
    });
});