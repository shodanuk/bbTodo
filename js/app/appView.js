var BTD;

BTD = BTD || {};

BTD.AppView = Backbone.View.extend ({
  el: '#main',
  initialize: function() {
    return BTD.Mediator.publish('ui:ready', this);
  }
});
