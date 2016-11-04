'use strict';
app.controller("preguntasController", function($scope,$firebaseArray, $firebaseObject, $location){

	var refCat = firebase.database().ref("tematica");
	$scope.objBDTematica = $firebaseArray(refCat);
	$scope.objTematica={};	

	var refPre = firebase.database().ref("pregunta");
	$scope.objBDPregunta = $firebaseArray(refPre);
	$scope.objPregunta={};

	$scope.agregarPregunta = function(p){
		$scope.objBDPregunta.$add(p);
		console.log(p);$scope.objPregunta={};
	}

	$scope.registrarCat =  function(t){
		$scope.objBDTematica.$add(t);
		console.log(t);
	}

	$(document).ready(function() {
        $('select').material_select();
        $(".button-collapse").sideNav();

    });

    $(document).ready(function(){
	    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	    $('.modal-trigger').leanModal();
	    $(".button-collapse").sideNav();
  });
        
});