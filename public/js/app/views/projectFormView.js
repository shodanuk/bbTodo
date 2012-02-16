var BTD = BTD || {};

BTD.ProjectFormView = Backbone.View.extend({
    projectFormTmpl: dust.compileFn($('#tmpl-project-form').html(), 'projectForm'),
    modalTmpl: dust.compileFn($('#tmpl-plain-modal').html(), 'modal'),
    id: 'new-project-form',
    className: 'hide-me fade modal',

    events: {
        'submit'        : 'saveProject',
        'click .cancel' : 'hide'
    },
    /**
     * Main title input form field reference.
     */
    $titleInput: null,
    /**
     * Inline feedback message element reference.
     */
    $inlineHelp: null,
    /**
     * Reference for the DOM element wrapping the title input and inline help text.
     */
    $inputWrapper: null,


    initialize: function() {
        console.log('ProjectFormView.initialize');

        _.bindAll(this, 'show', 'hide', 'saveProject', 'render', 'insertMarkup');
        BTD.Mediator.subscribe('projectForm:show', this.show);
        BTD.Mediator.subscribe('projectForm:hide', this.hide);
    },

    /**
     * Render the view. We cache references to some key dom elements for later use.
     */
    render: function() {
        console.log('ProjectFormView.render');

        // Default to a blank title
        var title   = '',
            form    = '';

        if (typeof this.model !== 'undefined') {
            title = this.model.get('title');
        }

        this.projectFormTmpl({ title : title }, _.bind(function (err, out) {
            this.modalTmpl({ body: out }, this.insertMarkup);
        },this));

        return this;
    },

    /**
     * Callback function e
     *
     * @param err
     * @param out
     */
    insertMarkup: function (err, out) {
        if (err !== null) {
            console.log(err);
            return false;
        }

        this.$el.html(out);

        // Cache references to key elements in the view
        this.$titleInput    = this.$("#project-title");
        this.$inlineHelp    = this.$(".help-inline");
        this.$inputWrapper  = this.$titleInput.closest('.clearfix');

        this.trigger('ready');
    },

    /**
     * Save a new project
     *
     * @param obj evt DOM Event object
     */
    saveProject: function(evt) {
        console.log('ProjectFormView.saveProject');

        var newProjectModel;

        // Prevent event default event action
        evt.preventDefault();

        // Reset the title form field, removing any outstanding error messages and styling
        this.resetTitle();

        BTD.Mediator.publish('project:create', {
            'attrs' : {
                'title' : this.$titleInput.val()
            },
            success: _.bind(function () {
                this.hide();
            }, this),
            error: _.bind(function (model, msg) {
                this.onError(model, msg);
            }, this)
        });
    },

    /**
     * Show the new project form
     */
    show: function() {
        console.log("ProjectFormView.show");

        this.resetTitle();
        this.$titleInput.val("");
        this.$el.modal('show');
    },

    /**
     * Hide the new project form
     */
    hide: function() {
        console.log("ProjectFormView.hide");

        this.$el.modal('hide');
    },

    /**
     * Reset the title form field to it's original state. Remove any feedback, messages,
     * styling etc.
     */
    resetTitle: function() {
        console.log("ProjectFormView.resetTitle");

        this.$inputWrapper.removeClass('error');
        this.$titleInput.removeClass('error');
        this.$inlineHelp.text("");
    },

    /**
     * Display error message and add error styling
     *
     * @param obj model
     * @param string error Error message text
     */
    onError: function(model, error) {
        console.error(error, model);

        this.$inputWrapper.addClass('error');
        this.$titleInput.addClass('error');
        this.$inlineHelp.text(error);
    }
});