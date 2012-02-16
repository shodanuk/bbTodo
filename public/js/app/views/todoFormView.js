var BTD = BTD || {};

BTD.TodoFormView = Backbone.View.extend({
    template: dust.compileFn($("#tmpl-todo-form").html(), 'todoFormView'),

    events: {
        'submit form' : 'onSubmit'
    },

    initialize: function () {
        console.log('todoFormView.render');

        _.bindAll(this, 'render', 'onSubmit');
    },

    render: function () {
        console.log('todoFormView.render');

        this.template({
            body    : '',
            project : ''
        }, _.bind(function (err, out) {

            this.$el.html(out);
            this.$todo_body     = this.$('#todo_body'); // Cache a reference to the main input field
            this.$project_id    = this.$('#project_id'); // Cache a reference to the main input field

        }, this));

        return this;
    },

    onSubmit: function (evt) {
        console.log('todoFormView.onSubmit');

        evt.preventDefault();

        BTD.Mediator.publish('todo:new', {
            'body'      : this.$todo_body.val(),
            'project'   : this.$project_id.val()
        });
    }
});