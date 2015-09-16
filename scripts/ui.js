'use strict';

var UI = {};
UI.profileTemplate = Handlebars.compile($('#profile-template').html());

// UI.editProfileTemplate = Handlebars.compile($('#edit-profile-template').html());

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

  $('#create-profile-button').on('click', function(){
    photogFinderApi.createProfile();
  });

  $('#edit-profile-button').on('click', function(){
    photogFinderApi.editProfile();
  });

  // $('#navbar-profile').on('click', function(){
  //   photogFinderApi.showProfile($(this).id);
  // });

}); // ends document.ready function
