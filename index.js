var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var Hapi = require('hapi');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/test');

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db conn success');
});

    var Schema = Mongoose.Schema;
    var TaskSchema = new Schema({
    body: { type: String, required: true }
    });
  var Task = Mongoose.model('task', TaskSchema);

  var server = new Hapi.Server();
  server.connection({ port: 9000 , routes: {cors:true}});

  server.start(function () {

  console.log('Server running at:', server.info.uri);

});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply({a:1, b:3});
  }
});

// GET ALL

server.route({
  method: 'GET',
  path: '/tasks',
  handler: function (request, reply) {

    Task.find({}, function(err, task) {
        if (!err) {
            reply(task);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
  }
});

// CREATE POST

server.route({
  method: 'POST',
  path: '/tasks',
  handler: function (request, reply) {
    var task = new Task(request.payload);

    task.save({}, function(err, task) {
        if (!err) {
            reply(task);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
  }
});

// GET ONE

server.route({
  method: 'GET',
  path: '/tasks/{_id}',
  handler: function (request, reply) {

    Task.findOne({'_id': request.params._id}, function(err, task) {
      console.log(task);
        if (!err) {
            reply(task);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
  }
});

// DELETE

server.route({
  method: 'DELETE',
  path: '/tasks/{_id}',
  handler: function (request, reply) {

    Task.remove({'_id': request.params._id}, function(err, task) {
      console.log(task);
        if (!err) {
            reply(task);
        } else {
            reply(Boom.badImplementation(err)); // 500 er, ror
        }
    });
  }
});

// UPDATE

server.route({
  method: 'PUT',
  path: '/update/{_id}',
  handler: function (request, reply) {
    console.log('request.payload.body: ', request.payload.body);

    Task.update({'body': request.payload.body}, function(err, task) {
      console.log(task);
        if (!err) {
            reply(task);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
  }
});
