var BTD = BTD || {};

BTD.projectRouter = Backbone.Router.extend({
    /**
     *
     */
    routes: {
        'project/create'        : 'createProject',
        'project/show/:id'      : 'showProject',
        'project/delete/:id'    : 'deleteProject',
        'project/update/:id'    : 'updateProject'
    }
});