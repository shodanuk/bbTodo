var BTD = BTD || {};

BTD.TodoView = Backbone.View.extend({
    template    : dust.compileFn($("#tmpl-todo").html()),
    tagName     : 'article',
    className   : 'todo',
    events      : {
        'click .status' : 'statusClick',
        'click .delete' : 'deleteClick'
    },

    initialize: function () {
        console.log('TodoView.initialize');

        _.bindAll(this, 'render', 'statusClick', 'deleteClick', 'removeTodo', 'updateStatus');
        this.model.on('remove', this.removeTodo);
        this.model.on('change', this.render);
        this.model.view = this;
    },

    render: function () {
        console.log('todoView.render');

        this.template(this.model.toJSON(), _.bind(function(err, out){
            this.$el.html(out);
        }, this));
        return this;
    },

    statusClick: function (evt) {
        console.log('todoView.statusClick');

        evt.preventDefault();
        this.model.toggle();
    },

    deleteClick: function (evt) {
        console.log('todoView.deleteClick', this.model);

        evt.preventDefault();
        this.model.clear();
    },

    updateStatus: function () {
        console.log('todoView.updateStatus');

    },
    
    removeTodo: function (el) {
        console.log('todoView.removeTodo');

        this.$el.remove();
    }
});