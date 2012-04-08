/**
 * Main namespace
 */
var BTD = BTD || {};

BTD.TodoModel = Backbone.Model.extend({
    defaults: {
        body        : '',
        complete    : false,
        date        : null
    },

    localStorage: new Store("BTD_Projects"),

    /**
     * Toggle the 'complete' state of the todo.
     */
    toggle: function () {
        this.set({ "complete": ( ! this.get('complete')) });
    },

    /**
     * Validate the todo model. Todos must have a non-blank body attribute.
     *
     * @param {Object} attrs
     */
    validate: function (attrs) {
        if ( ! attrs.body || attrs.body == '') return 'Todo items must cannot be blank';
    },

    /**
     * Remove the todo from db and remove it's view element from the DOM
     */
    clearTodo: function () {
        if ( ! _.isUndefined(this.collection)) {
            this.collection.on('remove', function () {
                this.view.remove();
            }, this);

            this.collection.remove(this);
        } else {
            this.view.remove();
        }
    }
});