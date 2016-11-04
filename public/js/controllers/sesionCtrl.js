'use strict';
app.controller("sesionController", function($scope, $location){
	$scope.login={};

	$scope.iniciarSesion=function(login){
		var email=login.correo;
		var password=login.contrasena;
		if (email==null||password==null) {
			  Materialize.toast('Por favor, llene todos los campos.', 3000, 'rounded');
		}else{
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorCode);
			  console.log(errorMessage);
			  if (errorCode==='auth/wrong-password') {
			  	Materialize.toast('Contraseña incorrecta!', 3000, 'rounded');
			  }
			  else if (errorCode==='auth/user-not-found') {
			  	Materialize.toast('Usuario no encontrado!', 3000, 'rounded');
			  }
			  else if (errorCode==='auth/invalid-email') {
			  	Materialize.toast('Email invalido!', 3000, 'rounded');
			  }
			  else if (errorCode==='auth/network-request-failed') {
			  	Materialize.toast('Consulta de red fallida, revise su conexión a internet.', 3000, 'rounded');
			  }
			  // ...
			});
		}		
	};
	$scope.cancelarForm=function(){
		$scope.login='';
	};
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    window.location.href='#/bienvenido';
	  } else {
	    //window.location.href='/';
	  }
	});
});