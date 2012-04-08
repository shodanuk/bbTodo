var BTD = BTD || {};

BTD.ProjectFormView = Backbone.View.extend({
    projectFormTmpl: dust.compileFn($('#tmpl-project-form').html(), 'projectForm'),

    events: {
        'submit form'   : 'saveProject',
        'click .close'  : 'hide'
    },

    initialize: function() {
        _.bindAll(this, 'saveProject', 'render', 'show', 'hide');
        BTD.Mediator.subscribe('projectForm:show', this.show);
    },

    /**
     * Render the view. We cache references to some key dom elements for later use.
     */
    render: function() {
        // Default to a blank title
        var title   = '',
            form    = '';

        if (typeof this.model !== 'undefined') {
            title = this.model.get('title');
        }

        this.projectFormTmpl({ title : title }, _.bind(function (err, out) {
            this.$el.html(out);

            // Cache key DOM elements
            this.$projectTitle  = this.$("#project-title");
            this.$controlGroup  = this.$projectTitle.closest('.control-group');
            this.$inlineHelp    = this.$(".help-inline");

            BTD.Mediator.publish('ui:ready', this);
        },this));

        return this;
    },

    /**
     * Save a new project
     *
     * @param obj evt DOM Event object
     */
    saveProject: function(evt) {
        evt.preventDefault(); // Prevent event default event action

        this.resetTitle(); // Reset the title form field, removing any outstanding error messages and styling

        if ( ! _.isUndefined(this.options.collection)) {
            var attrs   = {
                    'title' : this.$projectTitle.val()
                },
                success = _.bind(function () {}, this),
                error   = _.bind(function (model, msg) {
                    this.onError(model, msg);
                }, this);

            this.options.collection.addProject(attrs, success, error);
        }
    },

    /**
     * Reset the title form field to it's original state. Remove any feedback, messages,
     * styling etc.
     */
    resetTitle: function() {
        this.$controlGroup.removeClass('error');
        this.$projectTitle.removeClass('error');
        this.$inlineHelp.text("");
    },

    /**
     * Display error message and add error styling
     *
     * @param obj model
     * @param string error Error message text
     */
    onError: function(model, error) {
        this.$controlGroup.addClass('error');
        this.$projectTitle.addClass('error');
        this.$inlineHelp.text(error);
    },

    show: function() {
        console.log('show');
        this.$el.fadeIn('fast');
    },

    hide: function() {
        this.$el.fadeOut('fast');
    }
});