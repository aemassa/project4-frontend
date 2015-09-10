'use strict';

$(document).ready(function(){

  // register and login
  $('#register-modal-button').on('click', function(e) {
    photogFinderApi.register();
  });

  $('#login-modal-button').on('click', function(e) {
    photogFinderApi.login();
  });

  // get all profiles
  $('#search-button').on('click', function(){
    photogFinderApi.getAllProfiles();
  });



}); // ends document.ready function
