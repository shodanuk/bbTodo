var BTD = BTD || {};

BTD.AppView = Backbone.View.extend({
    el: '#main',

    initialize: function () {
        BTD.Mediator.publish('ui:ready', this);
    }

});