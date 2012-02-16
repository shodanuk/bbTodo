var BTD = BTD || {};

BTD.ProjectListView = Backbone.View.extend({
    template: dust.compileFn($("#tmpl-project-list").html()),

    events: {
        'click #new-project'    : 'showProjectForm'
    },

    initialize: function() {
        console.log('ProjectListView.initialize',this);

        _.bindAll(this, 'render', 'showProjectForm', 'onFormReady');

        this.collection.on('add', this.render);
        this.collection.on('remove', this.render);

        this.projectFormView = new BTD.ProjectFormView();
    },

    render: function() {
        console.log('ProjectListView.render',this);

        this.template({
            'projects' : this.collection.toJSON()
        }, _.bind(function (err, out) {
            this.$el.html(out);

            // When the projectFormView is ready, emit a ready event for this view
            this.projectFormView.on('ready', this.onFormReady);

            this.$el.append(this.projectFormView.render().el);

        }, this));

        return this;
    },

    onFormReady: function () {
        BTD.Mediator.publish('ui:ready', this);
    },

    showProjectForm: function () {
        BTD.Mediator.publish('projectForm:show');
    }
});