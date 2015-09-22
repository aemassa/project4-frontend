'use strict';

var UI = {};
UI.profileTemplate = Handlebars.compile($('#profile-template').html());

UI.detailTemplate = Handlebars.compile($('#detail-template').html());

$(document).ready(function(){

  // register
  $('#register-modal-button').on('click', function(e) {
    photogFinderApi.register();
  });

  // login
  $('#login-modal-button').on('click', function(e) {
    photogFinderApi.login();
  });

  // get all profiles
  $('#search-button').on('click', function(){
    // photogFinderApi.getAllProfiles();
    photogFinderApi.searchProfiles($('#zip-code').val());
  });

  // create profile
  $('#create-profile-button').on('click', function(){
    photogFinderApi.createProfile();
  });

  // edit profile
  $('#edit-profile-button').on('click', function(){
    photogFinderApi.editProfile();
  });

  // $('#details-button').on('click', function(){
  //   console.log('button clicked!');
    // photogFinderApi.showProfile();
    // $('#detail-page').removeClass(ß'hidden');
    // $('#jumbotron').hide();
    // $('#display').hide();
  // });

  // $('#navbar-profile').on('click', function(){
  //   photogFinderApi.showProfile($(this).id);
  // });

}); // ends document.ready function
