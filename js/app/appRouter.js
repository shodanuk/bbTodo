var BTD;

BTD = BTD || {};

BTD.appRouter = Backbone.Router.extend({
  routes: {
    '': 'home',
    'project/create': 'createProject',
    'project/show/:id': 'showProject',
    'project/delete/:id': 'deleteProject',
    'project/update/:id': 'updateProject',
    '404': 'pageNotFound',
    '*other': 'pageNotFound'
  },
  /*
    A list of all UI components. If you add a new one, add a reference to it here or the
    appReady event will never fire.
  */
  uiComponents: ['appView', 'projectListView', 'projectView', 'projectFormView', 'todoFormView'],
  /*
    The number of UI components that are rendered and in a 'ready' state. The count is incremented
    each time a ui:ready event is received from a UI component. When the count matches the number of
    items in the uiComponents array, the application is deemed 'ready' and the app:ready event is fired
  */
  componentsReady: 0,
  initialize: function() {
    _.bindAll(this, 'uiComponentReady', 'appError');
    BTD.Mediator.subscribe('ui:ready', this.uiComponentReady);
    BTD.Mediator.subscribe('app:error', this.appError);
    this.projectsCollection = new BTD.ProjectsCollection;
    this.projectsCollection.fetch();
    this.appView = new BTD.AppView;
    this.projectListView = new BTD.ProjectListView({
      'collection': this.projectsCollection,
      'el': "#project-list"
    });
    this.projectFormView = new BTD.ProjectFormView({
      'collection': this.projectsCollection,
      'el': '#new-project-form'
    });
    this.todoFormView = new BTD.TodoFormView({
      'el': "#new-todo-form"
    });
    this.projectListView.render();
    this.projectFormView.render();
    return this.todoFormView.render();
  },
  /*
    Display the main home page.
  */
  home: function() {
    var projectModel;
    if (this.projectsCollection.length) {
      projectModel = this.projectsCollection.first();
    } else {
      projectModel = new BTD.ProjectModel;
      this.projectsCollection.add(projectModel);
    }
    this.projectView = new BTD.ProjectView({
      el: "#current-project",
      model: projectModel,
      collection: this.projectsCollection
    });
    this.todoFormView.options.project = projectModel;
    return this.projectView.render();
  },
  /*
    View a project.
    
    @param {String} id The ID of the project to display.
  */
  showProject: function(id) {
    var projectModel;
    try {
      projectModel = this.projectsCollection.get(id);
    } catch (ex) {
      this.navigate('404', {
        'trigger': true
      });
      return;
    }
    this.projectsCollection.makeActive(id);
    this.todoFormView.options.project = projectModel;
    this.projectView = new BTD.ProjectView({
      el: "#current-project",
      model: projectModel,
      collection: this.projectsCollection
    });
    return this.projectView.render();
  },
  /*
    Display the add new project form
  */
  createProject: function() {
    this.home();
    return this.projectFormView.show();
  },
  /*
    Delete a project.
    
    @param {String} id The ID of the project to be deleted.
  */
  deleteProject: function(id) {
    var projectModel,
      _this = this;
    try {
      projectModel = this.projectsCollection.get(id);
    } catch (ex) {
      console.log(ex);
      BTD.Mediator.publish('app:error', 'Project delete failed, project not found.');
      return;
    }
    return projectModel.destroy({
      'success': function(model, response) {
        _this.projectsCollection.remove(model);
        BTD.Mediator.publish('project:deleted');
        return _this.navigate('', {
          'trigger': true
        });
      },
      'error': function(model, response) {
        console.log('Delete failed', model, response);
        return _this.navigate('', {
          'trigger': true
        });
      }
    });
  },
  /*
    Update a project.
    
    @param {String} id The Id of the project to update.
  */
  updateProject: function(id) {
    var projectModel;
    try {
      return projectModel = this.projectsCollection.get(id);
    } catch (ex) {
      BTD.Mediator.publish('app:error', 'Project update failed, project not found.');
    }
  },
  /*
    Default page if a request cannot be fulfilled
    
    TODO Implement a proper 404 page
  */
  pageNotFound: function() {
    return this.appView.$el.html('<h1>Sorry, the page you were looking for could not be found.</h1>');
  },
  /*
    Log a optional error message to the console and redirect to the '404 page'.
    
    @param {String} msg A message to be logged to teh console.
  */
  appError: function(msg) {
    if (msg != null) console.error(msg);
    return this.navigate('404', {
      'trigger': true
    });
  },
  /*
    Increment the componentsReady count. If all components are ready, fire
    the app:ready event.
  */
  uiComponentReady: function() {
    this.componentsReady++;
    if (this.componentsReady === this.uiComponents.length) {
      return BTD.Mediator.publish('app:ready');
    }
  }
});
