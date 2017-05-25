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
        if ($('input[name=email][type=email]').val() == "") {
            alert("email is required");
            this.checked = false;
            return false;
        } else if ($("input[name=pass][type=password]").val() == "") {
            alert("Password is required");
            this.checked = false;
            return false;
        } else {
            $('.showVolunteer').hide('fast');
            $('.showRescue').show('fast');
            $('.account').hide('fast');
        }
    });

    $("input[name=user][type=radio]").change(function () {
        // user has chosen to volunteer
        if ($('input[name=email][type=email]').val() == "") {
            alert("email is required");
            this.checked = false;
            return false;
        } else if ($("input[name=pass][type=password]").val() == "") {
            alert("Password is required");
            this.checked = false;
            return false;
        } else {
            $('.showVolunteer').show('fast');
            $('.showRescue').hide('fast');
            $('.account').hide('fast');
        }
    });

    $("button[name=admin-btn]").click(function (btn) {
        btn.preventDefault();
        // new admin is signing up
        $('#haemail').val($('input[name=email][type=email]').val());
        $('#hapass').val($('input[name=pass][type=password]').val());
        // lat and lng will be filled below in autocomplete listeners on html page script
        if (typeof (place) != "undefined") {
            $('#alat').val(place.geometry.location.lat());
            $('#alng').val(place.geometry.location.lng());
        } else {
            alert("Please select an address from dropdown list.")
            return false;
        }
        // alert($('#haemail').val());
        $("#adminForm").submit();
    });

    $("button[name=user-btn]").click(function () {
        // new volunteer is signing up
        $('#huemail').val($('input[name=email][type=email]').val());
        $('#hupass').val($('input[name=pass][type=password]').val());
        // lat and lng will be filled below in autocomplete listeners on html page script
        if (typeof (place) != "undefined") {
            $('#vlat').val(place.geometry.location.lat());
            $('#vlng').val(place.geometry.location.lng());
        } else {
            alert("Please select an address from dropdown list.")
            return false;
        }
        // alert($('#huemail').val());
        $("#volunteerForm").submit();
    });

    $("button[name=animal-btn]").click(function () {
        // new anmial is being added
        // api-routes will push data to db
        alert("animals latitude of origin is " + $("input[name=olat]").val())
    });

    $(".login_btn").on("click", function () {
        // if (sessionStorage.length !== 0) {
        //     if (sessionStorage.role === "user") {
        //         window.location = "/user/" + sessionStorage.userID;
        //     } else if (sessionStorage.role === "admin") {
        //         window.location = "/admin/" + sessionStorage.userID;
        //     }
        // }
    });


});