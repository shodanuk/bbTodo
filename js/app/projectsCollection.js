var BTD;

BTD = BTD || {};

BTD.ProjectsCollection = Backbone.Collection.extend({
  model: BTD.ProjectModel,
  url: '/project',
  localStorage: new Store('BTD_Projects'),
  activeProject: null,
  initialize: function() {
    _.bindAll(this, 'addProject');
    return BTD.Mediator.subscribe('project:create', this.addProject);
  },
  addProject: function(attrs, success, error) {
    return this.create(attrs, {
      'wait': true,
      'success': success,
      'error': error
    });
  },
  makeActive: function(id) {
    this.activeProject = id;
    return BTD.Mediator.publish('projectCollection:newActive');
  },
  getActiveProject: function() {
    return this.get(this.activeProject);
  }
});
