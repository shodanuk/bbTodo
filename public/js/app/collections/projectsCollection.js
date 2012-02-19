var BTD = BTD || {};

BTD.ProjectsCollection = Backbone.Collection.extend({
    model           : BTD.ProjectModel,
    url             : '/project',
    localStorage    : new Store("BTD_Projects"),
    activeProject   : null, // pointer to the currently active project.

    initialize: function () {
        _.bindAll(this, 'addProject');

        BTD.Mediator.subscribe('project:create', this.addProject);
    },

    /**
     * Add a new project to the projects collection.
     *
     * @param {Object} attrs Hash of attributes for the new project.
     * @param {Function} success Success callback function.
     * @param {Function} error  Error callback function.
     */
    addProject: function (attrs, success, error) {
        this.create(attrs, {
            'wait'      : true,
            'success'   : success  || null,
            'error'     : error    || null
        });
    },

    /**
     * Set a project to be the currently active project.
     *
     * @param {String} id The Id of the project to be made the current active project.
     */
    makeActive: function (id) {
        this.activeProject = id;
        BTD.Mediator.publish('projectCollection:newActive');
    },

    /**
     * Get the model for the current active project.
     *
     * @return {Object} The active project model object.
     */
    getActiveProject: function () {
        return this.get(this.activeProject);
    }
});