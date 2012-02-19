var BTD = BTD || {};

BTD.ProjectView = Backbone.View.extend({
    tagName: 'section',
    className: 'project',

    // Precompile and cache view templates
    todoTemplate: dust.compileFn($("#tmpl-todo").html(), 'todo'),
    template: dust.compileFn($("#tmpl-project").html(), 'projectView'),

    events: {
        'click .update' : 'clickUpdate'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'insertTodo');

        this.model.on('todos:new', this.insertTodo);
        this.model.view = this;
        this.model.todosCollection.on('add remove', this.render);
    },

    render: function () {
        var hasModel = ( ! _.isUndefined(this.model)); // Does this view have a model attached?

        var viewData = {
            id:    hasModel ? this.model.get('id')      : 0,
            title: hasModel ? this.model.get('title')   : false,
            todos: hasModel ? this.model.todosCollection.toJSON() : []
        };

        var onTemplateRender = _.bind(function (err, out) {
            var onReady = _.bind(function () {
                BTD.Mediator.publish('ui:ready', this); // Fire when the view has finished rendering
            }, this);

            this.$el.html(out);

            // If the project has a view attached, render all it's todo views
            if (hasModel) {
                this.$todoList = this.$('.todo-list');
                this.insertAllTodos(onReady);
            } else {
                onReady();
            }

            return this;
        }, this);

        this.template(viewData, onTemplateRender);
    },

    /**
     * Insert a single todo view into the DOM.
     *
     * @param {Object} todoModel
     */
    insertTodo: function (todoModel) {
        var view = new BTD.TodoView({ 'model': todoModel });
        this.$todoList.append(view.render().el);
    },

    /**
     * Insert all todo views into the DOM
     *
     * @param {Function} callback Callback function to execute after inserting all todo items
     */
    insertAllTodos: function (callback) {
        this.model.todosCollection.each(this.insertTodo);
        if (_.isFunction(callback)) {
            callback();
        }
    },

    /**
     * Click event handler for the update button.
     *
     * @param {Object} evt DOM event
     */
    clickUpdate: function (evt) {
        evt.preventDefault();

        // TODO make this work!
    }
});