var BTD = BTD || {};

BTD.TodoFormView = Backbone.View.extend({
    template: dust.compileFn($("#tmpl-todo-form").html(), 'todoFormView'),

    events: {
        'submit form' : 'onSubmit'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'onSubmit');
    },

    render: function () {
        this.template({
            body : '',
            date : ''
        }, _.bind(function (err, out) {

            this.$el.html(out);

            // Cache references to DOM elements.
            this.$bodyInput     = this.$("#todo-body");
            this.$inlineHelp    = this.$(".help-block");
            this.$inputWrapper  = this.$bodyInput.closest('.control-group');

            BTD.Mediator.publish('ui:ready', this);

        }, this));

        return this;
    },

    /**
     * Submit event handler for the todo form.
     *
     * @param {Object} evt DOM event
     */
    onSubmit: function (evt) {
        evt.preventDefault();

        this.options.project.addTodo(
            // New todo model attributes
            {
                'body': this.$bodyInput.val()
            },

            // Success callback function
            _.bind(function () {
                this.$bodyInput.val(''); // Clear the body form field
            }, this),

            // Error callback function
            _.bind(function () {
                this.onError(null, 'Set a proper error message here');
            }, this)
        );
    },

    /**
     * Reset the form to it's original state. Remove any feedback, messages,
     * styling etc.
     */
    resetForm: function() {
        this.$inputWrapper.removeClass('error');
        this.$bodyInput.removeClass('error');
        this.$inlineHelp.text("");
    },

    /**
     * Display error message and add error styling.
     *
     * @param {Object} model
     * @param {String} error Error message text
     */
    onError: function(model, error) {
        this.$inputWrapper.addClass('error');
        this.$bodyInput.addClass('error');
        this.$inlineHelp.text(error);
    }
});