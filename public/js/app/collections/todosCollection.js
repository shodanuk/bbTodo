var BTD = BTD || {};

BTD.TodosCollection = Backbone.Collection.extend({
    model: BTD.TodoModel,
    localStorage: new Store("BTD_Projects"),
    initialize: function () {
    }
});