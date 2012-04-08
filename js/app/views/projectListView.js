var BTD = BTD || {};

BTD.ProjectListView = Backbone.View.extend({
    template: dust.compileFn($("#tmpl-project-list").html()),

    initialize: function() {
        _.bindAll(this, 'render');
        this.collection.on('add remove', this.render);
    },

    render: function() {
        this.template({
            'projects' : this.collection.toJSON()
        }, _.bind(function (err, out) {
            this.$el.html(out);
            BTD.Mediator.publish('ui:ready', this);
        }, this));

        return this;
    }
});