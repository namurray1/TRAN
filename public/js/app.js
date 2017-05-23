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
        var aStreetAddr = $('input[name=astreetAddr][type=text]').text();
        var aPhone = $('input[name=aphone][type=text]').text();
        var npID = $('input[name=npID][type=text]').text();
        $('#haemail').val($('#email').val());
        $('#hapass').val($('#pass').val());
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        alert($('#haemail').val());

    });

    $("button[name=user-btn]").click(function () {
        // new volunteer is signing up
        // get ready to push data to db
        // alert("@user");
        var email = $('input[name=email][type=email]').text();
        var password = $("input[name=pass][type=password]").text();
        var userName = $('input[name=userName][type=text]').text();
        var vStreetAddr = $('input[name=vstreetAddr][type=text]').text();
        var vPhone = $('input[name=vphone][type=text]').text();
                // alert("@phone");
        $('#huemail').val($('#email').val());
        $('#hupass').val($('#pass').val());
                // alert("@hupass");
        // var lat = place.geometry.location.lat();
        // var lng = place.geometry.location.lng();
        
        // alert($('#huemail').val());
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