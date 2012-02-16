var BTD = BTD || {};

BTD.TodosCollection = Backbone.Collection.extend({
    model: BTD.TodoModel,
    initialize: function () {
        _.bindAll(this, 'removeTodo');

        this.bind('destroy', this.removeTodo);
    },

    removeTodo: function (todoModel) {
        console.log('TodosCollection.removeTodo', todoModel);

        this.remove(todoModel);
    }
});