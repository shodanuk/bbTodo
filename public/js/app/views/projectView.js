var BTD = BTD || {};

BTD.ProjectView = Backbone.View.extend({
    tagName: 'section',
    className: 'project',
    todoTemplate: dust.compileFn($("#tmpl-todo").html(), 'todo'),
    template: dust.compileFn($("#tmpl-project").html(), 'projectView'),

    events: {
        'click .update' : 'clickUpdate'
    },

    initialize: function () {
        console.log('ProjectView.initialize', this.model);

        dust.compile($('#tmpl-todo').html(), 'todo');

        _.bindAll(this, 'render', 'showActiveProject', 'insertTodo');
        //BTD.Mediator.subscribe('add', this.newProject);
        this.model.bind('change', this.render);
        this.model.view = this;

        this.todoFormView = new BTD.TodoFormView({
            model: new BTD.TodoModel()
        });
    },

    /**
     *
     *
     * @param obj model
     */
    showActiveProject: function (model) {
//        console.log('ProjectView.showActiveProject', model);
//
//        this.model = model;
//        this.render();
    },

    /**
     *
     *
     * @param fn callback
     */
    insertAllTodos: function (callback) {
        console.log('ProjectView.insertTodos', this.model);

        this.model.todos.each(this.insertTodo);

        if (typeof callback !== 'undefined') {
            callback();
        }
    },

    /**
     *
     * @param obj todoModel
     */
    insertTodo: function (todoModel) {
        console.log('ProjectView.insertTodo', todoModel);

        var view = new BTD.TodoView({ 'model': todoModel });
        this.$todoList.append(view.render().el);
    },

    /**
     *
     */
    render: function () {
        console.log('ProjectView.render', this.model);

        var hasModel = (typeof this.model !== 'undefined'); // Does this view have a model attached?

        var viewData = {
            id:    hasModel ? this.model.get('id')      : 0,
            title: hasModel ? this.model.get('title')   : false,
            todos: hasModel ? this.model.todos.toJSON() : []
        };

        var onTemplateRender = function (err, out) {
            var onReady = _.bind(function () {
                BTD.Mediator.publish('ui:ready', this);
            }, this);

            this.$el.html(out);
            this.$el.append(this.todoFormView.render().el);

            if (hasModel) {
                this.$todoList = this.$('.todo-list');
                this.insertAllTodos(onReady);
            } else {
                onReady();
            }

            return this;
        };

        this.template(viewData, _.bind(onTemplateRender, this));
    },

    /**
     *
     * @param obj evt
     */
    clickUpdate: function (evt) {
        console.log('projectView.clickUpdate');

        evt.preventDefault();
    }
});