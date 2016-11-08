'use strict';
app.controller("preguntasController", function($scope,$firebaseArray, $firebaseObject, $location, $routeParams){

	var refCat = firebase.database().ref("tematica");
	$scope.objBDTematica = $firebaseArray(refCat);
	$scope.objTematica={};	

	var refPre = firebase.database().ref("pregunta");
	$scope.objBDPregunta = $firebaseArray(refPre);
	$scope.objPregunta={};

	//var preguntaSeleccionada=[];
	$scope.objPSeleccionada='';
	var idSeleccionado= $routeParams.idPregunta;
	var objPSeleccionada;

	$scope.agregarPregunta = function(p){
		$scope.objBDPregunta.$add(p);
		$scope.objPregunta={};
	};

	$scope.registrarCat =  function(t){
		$scope.objBDTematica.$add(t);		
	};

	$(document).ready(function() {
        $('select').material_select();
        $(".button-collapse").sideNav();

    });

    $(document).ready(function(){
	    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	    $('.modal-trigger').leanModal();
	    $(".button-collapse").sideNav();
  	});

  	var claseActiva="activeM";
  	var url = $location.url();

	if(url==='/bienvenido'){
		$scope.itemBienvenido=claseActiva;
		$scope.itemGP='';
	}
	else if(url==='/formPreguntas'|| url==='/editarPregunta/'+idSeleccionado){
		$scope.itemGP=claseActiva;
		$scope.itemBienvenido='';	
	}
	else{
		$scope.itemGP='';
		$scope.itemBienvenido='';
	};

	if (idSeleccionado) {
		objPSeleccionada=getPregunta(idSeleccionado);		
		$scope.objPSeleccionada=objPSeleccionada[0];
	};

	function getPregunta(idSeleccionado){
		var obj = [];
		firebase.database().ref('pregunta/' + idSeleccionado).on('value', function(snapshot) {
		  obj.push(snapshot.val());
		});		
		return obj;		
	};

	$scope.cerrarSesion=function(){
		firebase.auth().signOut().then(function() {
		  window.location.href='/';
		}, function(error) {
		  // An error happened.
		});
	};
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	  } else {
	  	window.location.href='/';
	    //window.location.href='/';
	  }
	});
	$scope.editarPregunta = function(){
		firebase.database().ref('pregunta/' + idSeleccionado).set($scope.objPSeleccionada);
		$location.path("#bienvenido");
	}
	$scope.eliminarPregunta = function(p){
		$scope.objBDPregunta.$remove(p);
	};
        
});