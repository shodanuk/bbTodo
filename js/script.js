/**
 * bbTodo - Yet another backbone.js powered Todo List
 * Author: Terry Morgan
 */
var BTD = BTD || {};

// @codekit-prepend "libs/jquery-1.7.1.js", "libs/json2.js", "libs/underscore.js", "libs/backbone.js", "libs/bootstrap.js", "libs/dust-full-0.3.0.js", "plugins.js", "app/backbone.localStorage.js", "app/mediator.js";
// @codekit-prepend "app/projectModel.js", "app/todoModel.js", "app/projectsCollection.js", "app/todosCollection.js", "app/todoFormView.js", "app/projectFormView.js", "app/projectListView.js", "app/projectListViewProject.js";
// @codekit-prepend "app/projectView.js", "app/todoView.js", "app/appView.js", "app/appRouter.js";

$(document).ready(function(){
    BTD.appRouter       = new BTD.appRouter();
    Backbone.history.start();
});