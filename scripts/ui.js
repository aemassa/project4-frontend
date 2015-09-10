'use strict';

$(document).ready(function(){

  // register and login
  $("#register-modal-button").on("click", function(e) {
    photogFinderApi.register();
  });

  $("#login-modal-button").on("click", function(e) {
    photogFinderApi.login();
  });



}); // ends document.ready function
