var BTD = BTD || {};

BTD.ProjectModel = Backbone.Model.extend({
    defaults: {
        title   : 'Your first todo list',
        todos   : []
    },

    todosCollection: [],

    localStorage: new Store("BTD_Projects"),

    initialize: function () {
        _.bindAll(this, 'addTodo', 'saveProject');

        this.todosCollection = new BTD.TodosCollection();
        this.todosCollection.reset(this.get('todos'));
        this.todosCollection.on('remove', this.saveProject);
    },

//    parse: function (resp) {
//        return resp.attributes;
//    },

    /**
     * Checks to see if a project contains any todo items
     */
    isEmpty: function () {
        return (this.todosCollection.length === 0);
    },

    /**
     * Checks for a truthy and non-blank title attribute
     *
     * @param obj attrs
     */
    validate: function (attrs) {
        if ( ! attrs.title || attrs.title === "") return 'Projects must have a title';
    },

    /**
     * Add a new todo item to the project.
     *
     * @param {Object} attrs. A hash of todo model attributes.
     * @param {Function} success Success callback function.
     * @param {Function} error Error callback function.
     */
    addTodo: function (attrs, success,  error) {
        var todo = new BTD.TodoModel();

        todo.on('change', function () {
            console.log('todo: ',todo);

            this.todosCollection.add(todo);
            this.saveProject(success,  error);
        }, this);

        todo.set(attrs, {
            'error': _.bind(function (model, error) {
                console.log('New todo error', model, error);
            },this)
        });
    },

    /**
     * Save the project.
     *
     * @param {Function} success Success callback function.
     * @param {Function} error Error callback function.
     */
    saveProject: function (success, error) {
        console.log('Project before save', this);
        this.save({
            // Convert todos collection to JSON and set the todos attribute to it's value.
            'title'     : this.get('title'),
            'todos'     : this.todosCollection.toJSON()
        }, {
            // Wait for the server to finish saving before firing the change event.
            'wait'      : true,

            // Success callback function.
            'success'   : _.bind(function (model, resp) {
                console.log('projectModel.updateProject save success', model, resp);
                console.log('Project after save', this);
                if (_.isFunction(success)) {
                    success(model, resp);
                }
            }, this),

            // Error callback function.
            'error'     : _.bind(function (model, resp) {
                console.log('projectModel.updateProject save error', model, resp);
                if (_.isFunction(error)) {
                    error(model, resp);
                }
            }, this)
        });
    }
});