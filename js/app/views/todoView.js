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
        _.bindAll(this, 'render', 'statusClick', 'deleteClick');
        this.model.on('change', this.render);
        this.model.view = this;
        if (this.model.get('complete')) {
            this.$el.addClass('complete');
        }
    },

    render: function () {
        this.template(this.model.toJSON(), _.bind(function(err, out){
            this.$el.html(out);
        }, this));
        return this;
    },

    /**
     * Click event handler for the todo status toggle.
     *
     * @param {Object} evt DOM event
     */
    statusClick: function (evt) {
        evt.preventDefault();

        this.model.toggle();

        this.$el.toggleClass('complete');
    },

    /**
     * Click event handler for the delete todo button.
     *
     * @param {Object} evt DOM event
     */
    deleteClick: function (evt) {
        evt.preventDefault();

        this.model.clearTodo();
    }
});