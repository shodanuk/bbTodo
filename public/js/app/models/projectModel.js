var BTD = BTD || {};

BTD.ProjectModel = Backbone.Model.extend({
    defaults: {
        title   : 'Your first todo list',
        todos   : []
    },

    todos: [],

    localStorage: new Store("BTD_Projects"),

    initialize: function () {
        this.todos = new BTD.TodosCollection();
        this.todos.add(this.get('todos'));
    },

    /**
     * Checks to see if a project contains any todo items
     */
    isEmpty: function () {
        return (this.todos.length === 0);
    },

    /**
     * Checks for a truthy and non-blank title attribute
     *
     * @param obj attrs
     */
    validate: function (attrs) {
        if ( ! attrs.title || attrs.title === "") return 'Projects must have a title';
    }
});