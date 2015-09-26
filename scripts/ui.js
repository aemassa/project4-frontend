'use strict';

var UI = {};
UI.profileTemplate = Handlebars.compile($('#profile-template').html());

UI.detailTemplate = Handlebars.compile($('#detail-template').html());

// UI.photoTemplate = Handlebars.compile($('#photo-template').html());

UI.photoGalleryTemplate = Handlebars.compile($('#photo-gallery-template').html());

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

$(document).ready(function(){

  photogFinderApi.getAllProfiles();

  // homepage toggling

  $('#navbar-brand').on('click', function(){
    $('#jumbotron').show();
    $('#display').show();
    $('#account-info').hide();
    $('#detail-page').hide();
    $('#manage-gallery').hide();
  });

  // register
  $('#register-modal-button').on('click', function(e) {
    photogFinderApi.register();
  });

  // login
  $('#login-modal-button').on('click', function(e) {
    photogFinderApi.login({
          credentials: {
            email: $('#login-modal-email').val(),
            password: $('#login-modal-password').val()
          }
        }, function(err, data) {

    });
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

  // manage photo gallery

  $('#manage-gallery-button').on('click', function(){
    $('#manage-gallery').removeClass('hidden');
    $('#account-info').hide();
    photogFinderApi.getCurrentPhotogPhotos();
  });

  // add photo
  $('#upload-photo-button').on('click', function(){
    photogFinderApi.createPhoto();
  });

  // delete photo
  // $('#delete-photo-button').on('click', function(){
  //   photogFinderApi.deletePhoto();
  // });

  // $('#details-button').on('click', function(){
  //   console.log('button clicked!');
    // photogFinderApi.showProfile();
    // $('#detail-page').removeClass('hidden');
    // $('#jumbotron').hide();
    // $('#display').hide();
  // });

  // $('#navbar-profile').on('click', function(){
  //   photogFinderApi.showProfile($(this).id);
  // });

}); // ends document.ready function
