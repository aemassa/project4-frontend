'use strict';

var sa = 'http://localhost:3000';

var photogFinderApi = (function () {
  return {
    register: function (){
      $.ajax(sa + '/photographers', {
        contentType: 'application/json',
        data: JSON.stringify({
          credentials: {
            email: $('#register-modal-email').val(),
            password: $('#register-modal-password').val(),
            password_confirmation: $('#register-modal-password-conf').val()
          }
        }),
        dataType: 'json',
        method: 'POST',
        processData: false
      })
      .done(function(data, textStatus, jqXHR) {
        alert("Registration successful! Please log in.");
        console.log(JSON.stringify(data));
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Registration failed. Please try again.");
        console.log('Registration failed.');
      });
    }, // ends register function
    login: function(){
      $.ajax(sa + '/login', {
        contentType: 'application/json',
        data: JSON.stringify({
          credentials: {
            email: $('#login-modal-email').val(),
            password: $('#login-modal-password').val()
          }
        }),
        dataType: 'json',
        method: 'POST',
        processData: false
      })
      .done(function(data, textStatus, jqXHR) {
            console.log(data);
            var photog = data.login_photographer;
            var profile = photog.profile;
            simpleStorage.set('token', photog.token);
            // Refactor into functions
            // Auto-populate profile info for existing profiles
            if (profile) {
              $('#profile-form').data('id', profile.id);
              $('#input-name').val(profile.name);
              $('#input-email').val(profile.email);
              $('#input-website').val(profile.website);
              $('#input-phone').val(profile.phone);
              $('#input-city').val(profile.city);
              $('#input-state').val(profile.state);
              $('#input-zip').val(profile.zip);
              $('#create-profile-button').hide();
              $('#edit-profile-button').removeClass('hidden');
              $('.create-profile').append('<img src="' + profile.image_url_thumb + '" alt="Profile Picture">'  );

            };

            // Hide homepage page info, show other stuff
            $('#account-info').removeClass('hidden');
            $('#jumbotron').hide();
            $('#display').hide();
            $('#detail-page').hide();
            $('#navbar-register').hide();
            $('#navbar-login').hide();
            $('#navbar-profile').removeClass('hidden');
          })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Login failed. Please try again.");
        console.log('Login failed.');
      });
    }, // ends login function
    getAllProfiles: function(){
      $.ajax(sa + '/profiles', {
        dataType: 'json',
        method: 'GET'
      })
      .done(function(data, textStatus, jqXHR) {
        console.log(JSON.stringify(data));
        var html = UI.profileTemplate({profiles: data.profiles});
        $('#profiles-list').html(html);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Failed to list profiles.");
        console.log('Failed to list profiles.');
      });
    }, // ends getAllProfiles function
    searchProfiles: function(zip){
      $.ajax(sa + '/profiles?zip=' + zip, {
        dataType: 'json',
        method: 'GET'
      })
      .done(function(data, textStatus, jqXHR) {
        console.log(JSON.stringify(data));
        var html = UI.profileTemplate({profiles: data.profiles});
        $('#profiles-list').html(html);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Failed to list profiles.");
        console.log('Failed to list profiles.');
      });
    }, // ends searchProfiles function
    createProfile: function(){
      var formData = new FormData($('#profile-form')[0]);
      $.ajax(sa + '/profiles', {
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
      })
      .done(function(data, textStatus, jqXHR) {
        alert("Profile created successfully!");
        console.log(JSON.stringify(data));
        $('#account-info').hide();
        //$('#edit-account-info').removeClass('hidden');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Failed to create profile. Please try again.");
        console.log('Failed to create profile.');
      });
    }, // ends createProfile function
    editProfile: function(){
      var $form = $('#profile-form');
      var formData = new FormData($form[0]);
      $.ajax(sa + '/profiles/' + $form.data('id'), {
        type: 'PATCH',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
      })
      .done(function(data, textStatus, jqXHR) {
        alert("Profile updated successfully!");
        console.log(JSON.stringify(data));
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Failed to update profile. Please try again.");
        console.log('Failed to update profile.');
      });
    }, // ends editProfile function
    createPhoto: function(){
      var $form = $('#gallery-form');
      var formData = new FormData($form[0]);
      console.log("$form is: ", $form);
      console.log("formData is: ", formData);
      // FIX ME
      $.ajax(sa + '/profiles/' + $('#profile-form').data('id') + '/photos', {
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
      })
      .done(function(data, textStatus, jqXHR) {
        alert("Photo added successfully!");
        console.log(JSON.stringify(data));
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("Failed to add photo. Please try again.");
        console.log('Failed to add photo.');
        console.log("THE CURRENT PHOTOGRAPHER IS ", current_photographer);
      });
    }




    // showProfile: function(){

      // $.ajax(sa + '/profiles/', {
      //   dataType: 'json',
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Token token=' + simpleStorage.get('token')
      //   }
      // })
      // .done(function(data, textStatus, jqXHR) {
      //   console.log(JSON.stringify(data));
      // })
      // .fail(function(jqXHR, textStatus, errorThrown) {
      //   alert("Failed to show profile.");
      //   console.log('Failed to show profile.');
      // });
    // }, // ends showProfile function
  }; // ends return

})(); //ends api function

$(document).ready(function(){
  // show one profile
  $('#profiles-list').on('click', '#profile-pic', function(){
    // console.log("$this: ", $(this));
    // console.log("button clicked!");
    // console.log($(this).data('id'));
    var clickedId = $(this).data('id');
    $.ajax(sa + '/profiles/' + clickedId, {
      dataType: 'json',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    })
    .done(function(data, textStatus, jqXHR) {
      console.log(JSON.stringify(data));
      $('#jumbotron').hide();
      $('#display').hide();
      $('#detail-page').removeClass('hidden');
      var detail = UI.detailTemplate({profile: data.profile});
      $('#details-list').html(detail);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("Failed to show profile.");
      console.log('Failed to show profile.');
    });
  });
})
