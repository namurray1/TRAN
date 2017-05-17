// address is getting populated via geolocation
var address = "";

// place is the geolocated object that will be returned
var place;

$(document).ready(function () {

    // since we're not using a multi-page app anymore, we couldn't refrence body
    // moved code below into the html file
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

    // if it is the signup page being loaded, hide the 2 divs
    $('.showVolunteer').hide();
    $('.showRescue').hide();

    $("input[name=admin][type=radio]").change(function () {
        // user has chosen the admin role
        $('.showVolunteer').hide('fast');
        $('.showRescue').show('fast');
        $('.account').hide('fast');
        // capture the email and password
        email = $("input[name=email][type=email]").text();
        password = $("input[name=pass][type=password]").text();
    });

    $("input[name=user][type=radio]").change(function () {
        // user has chosen to volunteer
        $('.showVolunteer').show('fast');
        $('.showRescue').hide('fast');
        $('.account').hide('fast');
    });

    $("button[name=admin-btn]").click(function () {
        // new admin is signing up
        // - get ready to push data to db
        var email = $('input[name=email][type=email]').text();
        var password = $("input[name=pass][type=password]").text();
        var adminName = $('input[name=adminName][type=text]').text();
        var orgName = $('input[name=orgName][type=text]').text();
        var aStreetAddr = $('input[name=a-streetAddr][type=text]').text();
        var aPhone = $('input[name=a-phone][type=text]').text();
        var npID = $('input[name=npID][type=text]').text();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
    });

    $("button[name=user-btn]").click(function () {
        // new volunteer is signing up
        // get ready to push data to db
        var email = $('input[name=email][type=email]').text();
        var password = $("input[name=pass][type=password]").text();
        var userName = $('input[name=userName][type=text]').text();
        var vStreetAddr = $('input[name=v-streetAddr][type=text]').text();
        var vPhone = $('input[name=v-phone][type=text]').text();
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
    });

    $(".submit_btn").on("click", function () {
        // not sure about this one, Melinda.
        // fill in some blanks for me?
        if (sessionStorage.length !== 0) {
            if (sessionStorage.role === "user") {
                window.location = "/user/" + sessionStorage.userID;
            } else if (sessionStorage.role === "admin") {
                window.location = "/admin/" + sessionStorage.userID;
            }
        }
    });

    function initAutocomplete() {
        // admin address
        autocomplete1 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('a-streetAddr')), {
                types: ['geocode']
            });

        // volunteer address
        autocomplete2 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('v-mailAddr')), {
                types: ['geocode']
            });
        //

        autocomplete1.addListener('place_changed', function () {
            place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            console.log("place is :");
            console.log(place);
        });

        autocomplete2.addListener('place_changed', function () {
            place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            console.log("place is :");
            console.log(place);
        });
    }
});