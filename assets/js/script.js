//Proměnné
	let users = [
		{
		name:"Admin",
		email:"email@litelight.com",
		password:"admin123"
		}
	];

$(function(){
	//Zkusit jestli neni v session storage uživatel přihlašen.
	if(!sessionStorage.name || !sessionStorage.email){
		sessionStorage.name = "";
		sessionStorage.email = "";
	} 
	
	if (sessionStorage.name != "" && sessionStorage.email != "") {
	    logIn(sessionStorage.name,sessionStorage.email);
	}



	//metoda pro zobrazeni zpravy
function message(header, text, type){

	$(".msg-background").css({
		"visibility":"visible",
		"opacity":"1"
	});
	$(".msg-hd").text(header);
	$(".msg-text").html(text);

	var _type = "";
	
	if(type == "success"){
		_type = type;
	}
	else if(type == "error"){
		_type = type;
	}else{
		_type = "";
	}
	$(".msg-frame").removeClass("error");
	$(".msg-frame").removeClass("success");
	$(".msg-frame").addClass(_type);

}
	//Metoda pro kontrolu formatu emailu, metoda pro kontrolu hesla(obsahuje alespon 1 čislo)
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	function validatePassword(pass){
		 return /\d/.test(pass);
	}

	//Ukaže / Schová přihlašovací okno
	function showForm(){
		$("#loginregister").removeClass("hide");
	}
	function hideForm(){
		$("#loginregister").addClass("hide");
	}

	//funkce pro přihlášení
	function logIn(name, email){
		$(".login").addClass("log-logged");
		$(".register").addClass("reg-logged");
		$("#logged").removeClass("logged-no");

		$("#logged").html(`Logged in as <strong>${name}</strong>`);

		$("input[name='name']").attr("value",name);
		$("input[name='email']").attr("value",email);
		sessionStorage.name = name;
		sessionStorage.email = email;
		console.log(sessionStorage.name);
	}
	//funkce pro odhlášení
	function logOut(){
		$(".login").removeClass("log-logged");
		$(".register").removeClass("reg-logged");
		$("#logged").addClass("logged-no");

		$("#logged").html("");
		$("input[name='name']").attr("value","");
		$("input[name='email']").attr("value","");
		sessionStorage.name = "";
		sessionStorage.email = "";
	}
	//metoda pro registraci
	function register(username,mail,pass){
		console.log("register");
		let object = {
			name:username,
			email:mail,
			password:pass
		}
		users.push(object);
	}
//Tlačítka v navbaru
	$(".login").click(function(){
		showForm();
	});
	$(".register").click(function(){
		showForm();
	});
	$("#logged").click(function(){
		logOut();
	});
//Tlačítka v formu
	$("#closebtn").click(function(){
		hideForm();
	});


	$("#loginbtn").click(function(e){
		e.preventDefault();
		var errors = [];
		let name = $("input[name='username']")[0].value;
		let pass = $("input[name='password']")[0].value;
		let email = $("input[name='email']")[0].value;
		let userkey = 0;

		let notExisting = true;
		//Kontrola zda je vyplněné každé políčko (Jmeno nebo Email  + heslo)
		if(!$("input[name='username']")[0].value.replace(/ /g,'') && !$("input[name='email']")[0].value.replace(/ /g,'')){
			$("input[name='username']").prev().css("color","red");
			$("input[name='email']").prev().css("color","red");
			errors.push("<li>Fill in the Username or Email</li>");
		}
		if(!$("input[name='password']")[0].value){
			$("input[name='password']").prev().css("color","red");
			errors.push("<li>Fill in the Password</li>");
		}
		//Kontroluje zda účet existuje
		users.forEach(function(value,key){
			if(name == value.name || email == value.email){
				notExisting = false;
				userkey = key;

			}
		});

		if(notExisting){
			errors.push("<li>Not existing user!</li>");
		}
		else{
			if(users[userkey].password != pass){
				errors.push("<li>Wrong Password!</li>");
			}else{
				if(email != users[userkey].email){
					email = users[userkey].email;
				}
				if(name != users[userkey].name){
					name = users[userkey].name;
				}
			}
		}

		if(errors.length < 1){
			message("Successfully Logged in!", `Welcome to our site,${name}`, "success");
			logIn(name,email);
			hideForm();
		}
		else{
			var html = "";
			errors.forEach(function(value, key){
				html = html + value;
			});
			message("Error List",html,"error");	
		}

	});

	//Kontrola zda je vše vyplněno, a ve správnem formátu
	$("#registerbtn").click(function(e){
			e.preventDefault();
		var errors = [];
		if(!$("input[name='username']")[0].value.replace(/ /g,'')){
			$("input[name='username']").prev().css("color","red");
			errors.push("<li>Fill in the Username</li>");
		}
		if(!$("input[name='email']")[0].value.replace(/ /g,'')){
			$("input[name='email']").prev().css("color","red");
			errors.push("<li>Fill in the Email</li>");
		}else if(!validateEmail($("input[name='email']")[0].value.replace(/ /g,''))){
			$("input[name='email']").prev().css("color","red");
			errors.push("<li>Email should be in valid format!</li>");
		}
		if(!$("input[name='password']")[0].value){
			$("input[name='password']").prev().css("color","red");
			errors.push("<li>Fill in the Password</li>");
		}else if($("input[name='password']")[0].value.length < 6){
			$("input[name='password']").prev().css("color","red");
			errors.push("<li>Password should be atleast 6 characters long</li>");
		}else if(!validatePassword($("input[name='password']")[0].value)){
			errors.push("<li>Passwords should contain a number!</li>");
		}


		users.forEach(function(value,key){
			if($("input[name='username']")[0].value.replace(/ /g,'') == value.name){
				errors.push("<li>Username is already used!</li>");
			}
			if($("input[name='email']")[0].value.replace(/ /g,'') == value.email){
				errors.push("<li>Email is already used!</li>");
			}
		});

		if(errors.length < 1){
			message("Successfully Registered!", `Welcome to our site, ${$("input[name='username']")[0].value.replace(/ /g,'')}!`, "success");
			let name = $("input[name='username']")[0].value;
			let pass = $("input[name='password']")[0].value;
			let email = $("input[name='email']")[0].value;
			register(name,email,pass);
			hideForm();
		}
		else{
			var html = "";
			errors.forEach(function(value, key){
				html = html + value;
			});
			message("Error List",html,"error");	
		}
	
	});


	//Zavirani message boxu
	$(".msg-close").click(function(){
			$(".msg-background").css({
			"visibility":"hidden",
			"opacity":"0"
			});
	});
	$(".msg-background").click(function(){
			$(".msg-background").css({
			"visibility":"hidden",
			"opacity":"0"
			});
	});


});
