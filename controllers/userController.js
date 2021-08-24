var User = require('../models/user');

const { body,validationResult } = require('express-validator');


var async = require('async');
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://user:userpass@data.kqzcb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

var user_info;

exports.index = function(req, res) {
  //res.send('NOT IMPLEMENTED: leaderBoard');

      async.parallel({
          user_count: function(callback) {
              User.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
          },

      }, function(err, results) {
          res.render('index', { title: 'Flappy Bird', error: err, data: results });
      });

};



exports.user_create_get = function(req, res) {
  res.render('user_form', { title: 'Create User' });



};


//user_create_post
exports.user_create_post = [

    // Validate and sanitize fields.
    body('username').isLength({ min: 1 }).escape().withMessage('Username must be specified.'),
    body('password').isLength({ min: 1 }).withMessage('Password must be specified.'),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data
        var user = new User(
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                score: 0,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            alert("I am an alert box!");
            return;
        }
        else {
            // Data from formssd is valid.

            // Save author.
            user.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                //This.cookie = user=username;
                //console.log(This.cookie);
                res.redirect('/catalog/flappybird');
            });
        }
    }
];


//user_list
exports.user_list = function(req, res) {
  User.find()
     .sort([['score', 'descending']])
     .exec(function(err, list_user) {
         if (err) { return next(err); }
         // Successful, so render.
         res.render('user_list', { title: 'Leaderboard', user_list: list_user });
    });
};



exports.user_verify = function(req, res) {
  User.find()
     .exec(function(err, list_user) {
         if (err) { return next(err); }
         // Successful, so render.

         res.render('user_form_log', { title: 'Log in', user_list: list_user });
         console.log(list_user);
         var user_info = list_user[0];
         console.log(user_info.username);
    });
    console.log(user_info.password);
    /*
    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        alert("I am an alert box!");
        return;
    }
    else {
        // Data from formssd is valid.

        // Save author.
        user.save(function (err) {
            if (err) { return next(err); }
            // Successful - redirect to new author record.
            //This.cookie = user=username;
            //console.log(This.cookie);
            res.redirect('/catalog/flappybird');
        });
    }
    */
};



exports.flappybird = function(req, res) {
  results = 'null';
  //res.redirect('/flappy_bird.html', { title: 'Game of the Week', data: results });
  res.render('flappy', { title: results });

};
