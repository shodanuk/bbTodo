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

    initialize: function () {
        console.log('TodoModel.initialize');


    },

    toggle: function () {
        console.log('TodoModel.toggle');

        this.set({ "complete": ( ! this.get('complete')) });
    },

    /**
     *
     *
     * @param obj attrs
     */
    validate: function (attrs) {
        if ( ! attrs.body || attrs.body == '') return 'Todo items must cannot be blank';
    },

    /**
     * Remove the todo from db and remove it's view element from the DOM
     */
    clear: function () {
        this.destroy({
            success: function (model, response) {
                console.log('success', model, response);
                this.view.remove();
            },
            error: function (model, response) {
                console.log('error', model, response);
            }
        });
    }
});