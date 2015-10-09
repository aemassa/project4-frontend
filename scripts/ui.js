'use strict';

var UI = {};
UI.profileTemplate = Handlebars.compile($('#profile-template').html());

UI.detailTemplate = Handlebars.compile($('#detail-template').html());

// UI.profilePhotoTemplate = Handlebars.compile($('#profile-photo-template').html());

UI.photoGalleryTemplate = Handlebars.compile($('#photo-gallery-template').html());

UI.editPhotoGalleryTemplate = Handlebars.compile($('#edit-photo-gallery-template').html());

UI.modalGalleryTemplate = Handlebars.compile($('#modal-gallery-template').html());

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
  $('#details-list').on('click', '#sidebar-edit-profile', function(){
    $('#account-info').removeClass('hidden');
    $('#account-info').show();
    $('#detail-page').hide();
    // console.log('you clicked me');
  })

  $('#save-changes-button').on('click', function(){
    photogFinderApi.editProfile();
  });

  // manage photo gallery

  $('#manage-gallery-button').on('click', function(){
    console.log('you clicked me');
    $('#manage-gallery').removeClass('hidden');
    $('#manage-gallery').show();
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

  $('#navbar-profile').on('click', function(){
    photogFinderApi.showProfile($(this).id);
  });

}); // ends document.ready function
