/**
 * bbTodo - Yet another backbone.js powered Todo List
 * Author: Terry Morgan
 */
var BTD = BTD || {};

$(document).ready(function(){
    //BTD.projectRouter   = new BTD.projectRouter();
    BTD.appRouter       = new BTD.appRouter();
    Backbone.history.start();
});