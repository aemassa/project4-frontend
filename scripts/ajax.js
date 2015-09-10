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
            //myToken = data.token;
            simpleStorage.set('token', data.token);
            console.log(data.token);
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
    } // ends getAllProfiles function
  }; // ends return

})(); //ends api function

