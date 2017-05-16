$(document).ready(function () {
    var count = 0; // to count blank fields

    $('.showVolunteer').hide();
    $('.showRescue').hide();
    /*------------validation function-----------------*/
    $(".next_btn").click(function (event) {
        //fetching radio button by name
       
        console.log("hello");
        console.log((radio_check));
        $("input[type='button']").click(function () {
           radioValue $('input:radio[name=admin]:nth(0)').attr('checked', true);
          //  radioValue = $(input[value="Volunteer"]:checked).val();
        if (radioValue){
            $('.showRescue').hide();
            $('.showVolunteer').show();

        } 
        else {
            $('.showRescue').show();
            $('.showVolunteer').hide();

        }
    });









    /*	//for loop to count blank inputs 
    	for(var i=input_field.length;i>count;i--){
    	if(input_field[i-1].value==''|| text_area.value=='')
    		{
    			count = count + 1;
    		    
    		}
    	else{			
    			count = 0;
    		}
    	}
    	
    	//Notifying validation 
    		if(count!=0||y==0){
    		
    			alert("*All Fields are mandatory*");
    			event.preventDefault();	
    			}
    			else{			
    				return true;
    			}
    });*/

    /*---------------------------------------------------------*/


    $(".next_btn").click(function () { //Function runs on NEXT button click 
        $(this).parent().next().fadeIn('slow');
        $(this).parent().css({
            'display': 'none'
        });
        //Adding class active to show steps forward;
        $('.active').next().addClass('active');
    });

    $(".pre_btn").click(function () { //Function runs on PREVIOUS button click 
        $(this).parent().prev().fadeIn('slow');
        $(this).parent().css({
            'display': 'none'
        });
        //Removing class active to show steps backward;
        $('.active:last').removeClass('active');
    });

    //validating all input and textarea fields	
    $(".submit_btn").click(function (e) {
        if ($('input').val() == "" || $('textarea').val() == "") {
            alert("*All Fields are mandatory*");
            return false;
        } else {
            return true;
        }
    });
      
});