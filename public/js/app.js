//this is the code for scrollspy to allow smooth transitioning between the sections.

$(document).ready(function(){
  // Add scrollspy to <body>
  $('body').scrollspy({target: ".navbar", offset: 50});   

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    // Alex, remember that the hash property returns the anchor part of the URL including the hash sign
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // This variable will store hash
      var hash = this.hash;

      // This section of the code will animate the navbar and the speed can be change by using milliseconds. 
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  
  });
});

$(".userlogin").on("click", function() {
	if(sessionStorage.length !== 0) {
		if(sessionStorage.role === "user"){
			window.location = "/user/" + sessionStorage.userID;
		} else if(sessionStorage.role === "admin"){
			window.location = "/admin";
		}
	}else {
		$('#loginModal').modal('show'); 
	}
});
