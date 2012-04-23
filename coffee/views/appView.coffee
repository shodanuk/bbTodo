BTD = BTD or {}

BTD.AppView = Backbone.View.extend 
  el: '#main'
  initialize: ->
    BTD.Mediator.publish 'ui:ready', @ 