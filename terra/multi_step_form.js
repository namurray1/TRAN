

$(document).ready(function () {
     $('.showVolunteer').hide();
     $('.showRescue').hide();

          $("input[name=admin][type=radio]").change(function () {
             // alert($(this).attr("id") + " checked");
                $('.showVolunteer').hide('fast');
                $('.showRescue').show('fast');
                $('.account').hide('fast');
          });

          $(".next_button").click(function () {
              $("#rad2").prop('checked', true).change();
          });
          
            /*var count = 0; // to count blank fields

         /*   $('.showVolunteer').hide();
            $('.showRescue').hide();
            /*------------validation function-----------------*/
         /*   $(".next_btn").click(function (event) {
               
                    $(".rad1").trigger("click");
                    $('.showVolunteer').hide('fast');
                    $('.rad1').click(function () {
                        $('.showVolunteer').hide('fast');
                        $('showRescue').show('fast');
                    });
                    $('.rad2').click(function () {
                        $('.showRescue').hide('fast');
                        $('showVolunteer').show('fast');
                    });
                });
                        //fetching radio button by name

                        console.log("hello");

              /*          // $('.next_btn').click(function () {
                        $('#result').empty();
                        var value = $("form input[type='radio']:checked").val();
                        console.log(value);
            });
                      /*  if ($("form input[type='radio']").is(':checked')) {
                           if (value)
                        } else {
                           
                        }
                        $(this).parent().next().fadeIn('slow');
                        $(this).parent().css({
                            'display': 'none'
                        });
                        //Adding class active to show steps forward;
                        $('.active').next().addClass('active');
                        //});
                            $("input[type='button']").click(function () {
                          radioValue= $("form input[type='radio']:checked").val();
                          radioValue = $(input[value="Volunteer"]:checked).val();
                            if (radioValue){
                                $('.showRescue').hide();
                                $('.showVolunteer').show();

                            } 
                            else {
                                $('.showRescue').show();
                                $('.showVolunteer').hide();

                            }
                        });*/



});





   
