// jQuery.ajax
$(function() {
    "use strict";
    var sa = 'http://localhost:3000';

    // User Login/Sign-Up Requests

    $("#register-modal-button").on("click", function(e) {
        $.ajax(sa + "/photographers", {
            contentType: "application/json",
            data: JSON.stringify({
                credentials: {
                    email: $("#register-modal-email").val(),
                    password: $("#register-modal-password").val(),
                    password_confirmation: $("#register-modal-password-conf").val()
                }
            }),
            dataType: "json",
            method: "POST",
            processData: false
        })
        .done(function(data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Registration failed. Please try again.");
            console.log('Registration failed.');
        })
        .always();
    });

    $("#login-modal-button").on("click", function(e) {
        $.ajax(sa + "/login", {
            contentType: "application/json",
            data: JSON.stringify({
                credentials: {
                    email: $("#login-modal-email").val(),
                    password: $("#login-modal-password").val()
                }
            }),
            dataType: "json",
            method: "POST",
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
        })
        .always();
    });
});
