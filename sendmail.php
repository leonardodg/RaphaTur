<?php
error_reporting(0);
require 'libs/PHPMailer/PHPMailerAutoload.php';
header('Content-Type: text/html; charset=utf-8');

if(!$_POST["name"] or !$_POST["email"] or !$_POST["subject"] or !$_POST["message"]){
	echo 'Provide the data correctly!';
	return;
}

$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$subject = htmlspecialchars($_POST["subject"]);
$message = htmlspecialchars($_POST["message"]);

$mail = new PHPMailer;
$mail->isSMTP();
$mail->setLanguage('pt_br', 'libs/PHPMailer/language/');
$mail->IsHTML(true);
$mail->CharSet = "UTF-8";
// 0 = off (for production use) 1 = client messages 2 = client and server messages
$mail->SMTPDebug = 0; //Enable SMTP debugging 
$mail->Debugoutput = 'html';
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "raphaturtravel@gmail.com";
$mail->Password = "xxxxxxx";
$mail->setFrom('raphaturtravel@gmail.com', 'RaphaTur Travel');


$msgHTML = "<h1>Mensagem Enviado através do Site!</h1> <br>
			Nome do Cliente: $name <br>
			Email: $email <br>
			Assunto: $subject <br>
			Mensagem: $message <br>
			<a href='http://raphaturtravel.com'></a> <br>";

$mail->Subject = "Email de Contato - $subject";
$mail->addAddress('raphaturtravel@gmail.com', 'RaphaTur Travel');
$mail->msgHTML($msgHTML);
$mail->send();
$mail->clearAllRecipients();
$mail->addAddress($email, $name);
$mail->addCC('raphaturtravel@gmail.com', 'RaphaTur Travel');


$mail->Subject = 'Confirmation - Email Sent!';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('Email.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'Prezado Cliente,
					 Your message contacting us has been sent with SUCCESS!
					 Thanks for contacting us, we will respond as soon as possible.
						Team RaphaTur Travel
					    Email: raphaturtravel@gmail.com
						Phone: +55 (48) 99850-9999';

//send the message, check for errors
if (!$mail->send()) {
    echo "Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent successfully!";
}
?>