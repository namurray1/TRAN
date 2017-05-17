//this is the code for scrollspy to allow smooth transitioning between the sections.

$(document).ready(function () {
    // // Add scrollspy to <body>
    // $('#main-body').scrollspy({
    //     target: ".navbar",
    //     offset: 50
    // });

    // Add smooth scrolling on all links inside the navbar
    $("#myNavbar a").on('click', function (event) {
        // Alex, remember that the hash property returns the anchor part of the URL including the hash sign
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // This variable will store hash
            var hash = this.hash;

            // This section of the code will animate the navbar and the speed can be change by using milliseconds.
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

    $('.showVolunteer').hide();
    $('.showRescue').hide();

    $("input[name=admin][type=radio]").change(function () {
        // alert($(this).attr("id") + " checked");
        $('.showVolunteer').hide('fast');
        $('.showRescue').show('fast');
        $('.account').hide('fast');
    });

    $("input[name=user][type=radio]").change(function () {
        // alert($(this).attr("id") + " checked");
        $('.showVolunteer').show('fast');
        $('.showRescue').hide('fast');
        $('.account').hide('fast');
    });

    $(".next_button").click(function () {
        $("#rad2").prop('checked', true).change();

        // gather users data and push to db HERE
    });

});

$(".userlogin").on("click", function () {
    if (sessionStorage.length !== 0) {
        if (sessionStorage.role === "user") {
            window.location = "/user/" + sessionStorage.userID;
        } else if (sessionStorage.role === "admin") {
            window.location = "/admin";
        }
    } else {
        $('#loginModal').modal('show');
    }
});

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete1 = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('streetAddr')), {
            types: ['geocode']
        });
    // autocomplete2 = new google.maps.places.Autocomplete(
    //     /** @type {!HTMLInputElement} */
    //     (document.getElementById('mailAddr')), {
    //         types: ['geocode']
    //     });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete1.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Should we be saving anthing else about the place in the DB?
    // We could capture street address, state, zip code etc. and populate the form thusly:
    // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform

    // document.getElementById('mailAddr').text(document.getElementById('streetAddr').text())
}