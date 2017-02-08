/*
 @autor Leonardo Della Giustina
	Script principal do site http://raphaturtravel.com

	Função ajax para Enviar Email
	Valida Form
	Exibir Mensagem
*/

$(function() {

	$('.carousel').carousel({
        interval: 5000 //changes the speed
    });

	$("#sendForm").validate({
		rules: {
			name: "required",
			email : { required : true , email: true },
			subject : "required",
			message : "required"
		},
		messages: {
			name	: "Please specify your Name", 
			email	: "Please specify your Email",
			subject	: "Please specify the subject",
			message	: "Please specify the message"
		}
		
	});

	$alert = $(".alert-info");
  	$alert.hide();

  	$('#submit').on( "click", function(event){
  		$alert.hide();
  	
  	 var $frm = $("#sendForm");
		 $frm.validate();
		 if($frm.valid()){
		 	
		  	$.ajax({
				    url : "sendmail.php",
				    type: "POST",
				    data : $frm.serialize(),
				    success: function(data, textStatus, jqXHR){
				        $alert.text(data);
				        $alert.show();
				        // console.log(data)
				    },
				    error: function (jqXHR, textStatus, errorThrown){
				    	// console.log(data)
				 		$alert.text('Failed to send email!');
				 		$alert.show();
				    }
		 		});
			
		 }else{
		 	$alert.text('Error : Please fill in all the information!');
		 	$alert.show();
		 }
  });

});