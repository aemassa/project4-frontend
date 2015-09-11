'use strict';

var UI = {};
UI.profileTemplate = Handlebars.compile($('#profile-template').html());

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
    // photogFinderApi.getAllProfiles();
    photogFinderApi.searchProfiles($('#zip-code').val());


  });


}); // ends document.ready function
