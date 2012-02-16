var BTD = BTD || {};

BTD.ProjectsCollection = Backbone.Collection.extend({
    model           : BTD.ProjectModel,
    url             : '/projects',
    localStorage    : new Store("BTD_Projects"),
    activeProject   : null, // pointer to the currently active project.

    initialize: function () {
        console.log('ProjectsCollection.initialize');

        _.bindAll(this, 'addProject');

        BTD.Mediator.subscribe('project:create', this.addProject);
    },

    /**
     * Add a new project
     *
     * @param projectModel
     */
    addProject: function (data) {
        console.log('ProjectsCollection.addProject', data);

        var newProject;

        this.on('add', _.bind(function (projectModel) {
            if (projectModel) {
                if (typeof data.success !== 'undefined') {
                    data.success();
                }
            } else {
                if (typeof data.error !== 'undefined') {
                    data.error(null, projectModel);
                }
            }
        }, this));

        newProject = this.create(data.attrs, { 'wait' : true }); // Attempt to create the new project
    },

    /**
     *
     * @param string id Project Id
     */
    makeActive: function (id) {
        this.activeProject = id;

        BTD.Mediator.publish('projectCollection:newActive');
    }
});