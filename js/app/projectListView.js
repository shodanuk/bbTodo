var BTD;

BTD = BTD || {};

BTD.ProjectListView = Backbone.View.extend({
  template: dust.compileFn($("#tmpl-project-list").html()),
  collection: new BTD.ProjectsCollection,
  events: {
    'click #new-project': 'showNewProjectForm'
  },
  initialize: function() {
    return _.bindAll(this, 'render');
  },
  showNewProjectForm: function() {
    return BTD.Mediator.publish('projectForm:show');
  },
  render: function() {
    var _this = this;
    this.template({
      'projects': this.collection.toJSON()
    }, function(err, out) {
      var project, _i, _len, _ref;
      _this.$el.html(out);
      _ref = _this.collection.toJSON();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        project = _ref[_i];
        _this.insertProject(project);
      }
      return BTD.Mediator.publish('ui:ready', _this);
    });
    return this;
  },
  /*
    Insert a single projectListProject view into the DOM.
  
    @param {Object} projectModel
  */
  insertProject: function(projectModel) {
    var view;
    view = new BTD.ProjectListProjectView({
      "model": projectModel
    });
    return this.$el.append(view.render().el);
  }
});
