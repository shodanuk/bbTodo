var BTD = BTD || {};

BTD.appRouter = Backbone.Router.extend({
    routes: {
        ''                      : 'home',
        'project/create'        : 'createProject',
        'project/show/:id'      : 'showProject',
        'project/delete/:id'    : 'deleteProject',
        'project/update/:id'    : 'updateProject',
        '404'                   : 'pageNotFound',
        '*other'                : 'pageNotFound'
    },

    uiComponents: [
        'appView',
        'projectListView',
        'projectView'
    ],

    componentsReady: 0,

    initialize: function () {
        console.log('appRouter.initialize');

        _.bindAll(this, 'navigateTo', 'uiComponentReady', 'appError');

        BTD.Mediator.subscribe('ui:ready', this.uiComponentReady);
        BTD.Mediator.subscribe('app:error', this.appError);

        this.projectsCollection = new BTD.ProjectsCollection();
        this.projectsCollection.fetch();

        this.appView = new BTD.AppView();

        this.projectListView = new BTD.ProjectListView({
            collection  : this.projectsCollection,
            el          : "#project-list"
        });

        this.projectListView.render();
    },

    /**
     * Main home page
     */
    home: function () {
        var projectModel;

        if (this.projectsCollection.length > 0) {
            projectModel = this.projectsCollection.first();
        } else {
            this.navigate('project/create', { 'trigger': true });
            return;
        }

        this.projectView = new BTD.ProjectView({
            el      : "#current-project",
            model   : projectModel
        });

        this.projectView.render();
    },

    /**
     *
     */
    createProject: function () {
        this.projectView = new BTD.ProjectView({
            el      : "#current-project",
            model   : new BTD.ProjectModel()
        });

        this.projectView.render();

        BTD.Mediator.subscribe('app:ready', function () {
            BTD.Mediator.publish('projectForm:show');
        });
    },

    /**
     *
     */
    showProject: function(id) {
        var projectModel;

        try {
            projectModel = this.projectsCollection.get(id);
        } catch(ex) {
            this.navigate('404', { 'trigger' : true });
            return;
        }

        this.projectsCollection.makeActive(id);

        this.projectView = new BTD.ProjectView({
            el      : "#current-project",
            model   : projectModel
        });

        this.projectView.render();
    },

    /**
     *
     * @param id
     */
    deleteProject: function (id) {
        console.log('projectRouter.delete', id);

        var projectModel; // The project model to be deleted

        try {
            projectModel = this.projectsCollection.get(id);
        } catch(ex) {
            console.log(ex);
            BTD.Mediator.publish('app:error', 'Project delete failed, project not found.');
            return;
        }

        projectModel.destroy({
            success: _.bind(function (model, response) {
                this.projectsCollection.remove(model); // remove the model from the collection
                BTD.Mediator.publish('project:deleted');
                this.navigate('', { 'trigger': true });
            }, this),
            error: _.bind(function (model, response) {
                console.log('Delete failed', model, response);
                this.navigate('', { 'trigger': true });
            }, this)
        });
    },

    /**
     *
     * @param id
     */
    updateProject: function (id) {
        console.log('projectRouter.update');

        var projectModel

        try {
            projectModel = this.projectsCollection.get(id);
        } catch(ex) {
            BTD.Mediator.publish('app:error', 'Project update failed, project not found.');
            return;
        }
    },

    /**
     * Default page if a request cannot be fulfilled
     *
     * TODO Implement a proper 404 page
     */
    pageNotFound: function () {
        this.appView.$el.html('<h1>Sorry, the page you were looking for could not be found.</h1>');
    },

    /**
     *
     * @param string path
     */
    navigateTo: function (path) {
        console.log('appRouter.navigateTo', path);

        this.navigate(path, { trigger: true });
    },

    /**
     *
     *
     * @param string msg
     */
    appError: function (msg) {
        console.error(msg);
        this.navigate('404', { 'trigger' : true });
    },

    /**
     *
     *
     * @param obj component
     */
    uiComponentReady: function (component) {
        console.log('appRouter.uiComponentReady', component);

        this.componentsReady++;

        if (this.componentsReady === this.uiComponents.length) {
            console.log('app ready');
            BTD.Mediator.publish('app:ready');
        }
    }
});