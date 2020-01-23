$(document).ready(function() {

  $('form[id="contact"]').validate({
    rules: {
      name: 'required',
      email: {
        required: true,
        email: true,
      },
      telephone: {
        required: true,
        phoneUK: true
      },
     },
        messages: {
            name: {required: "Please enter your name."},
            email: {required: "Please enter your email address."},
            telephone: {required: "Please enter your telephone number."},
        },
    submitHandler: function(form) {
	$.urlParam = function(token){
    var results = new RegExp('[\?&]' + token + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
    }
	var formdata = $('#contact').serialize();
	console.log(formdata);
	var token = $.urlParam('token');
	var url = "https://tls-dev.web.app/contacts";  

  $.ajax({
		type: 'post',
		url: url,
		data: formdata,
		headers: {"Authorization": "Bearer " + token},
		success: function(result){
		$('#contact')[0].reset();
		$("#server_response").html("<span class='sucess'>Thank You - Your details have been submitted successfully and someone will contact you shortly.</span>");
		//alert("Thank You - Your details have been submitted successfully and someone will contact you shortly.");
},
		error: function() {
        $('#contact')[0].reset();
		$("#server_response").html("<span class='error'>Oops - Something went wrong, please try again or contact us some other way.</span>");
        }
  })
	  
	  
	  
	  //form.submit();
    }
  });

});