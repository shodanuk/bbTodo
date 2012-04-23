BTD = BTD or {}

BTD.ProjectListView = Backbone.View.extend
  template: dust.compileFn $("#tmpl-project-list").html()
  collection: new BTD.ProjectsCollection
  events:
    'click #new-project': 'showNewProjectForm'

  initialize: ->
    _.bindAll @, 'render'

  showNewProjectForm: ->
    BTD.Mediator.publish 'projectForm:show'

  render: ->
    @template 'projects' : @collection.toJSON(),
      (err, out) =>
        @$el.html out
        @insertProject project for project in @collection.toJSON()
        BTD.Mediator.publish 'ui:ready', @

    return @

  ###
  Insert a single projectListProject view into the DOM.

  @param {Object} projectModel
  ###
  insertProject: (projectModel) ->
    view = new BTD.ProjectListProjectView "model": projectModel
    @$el.append view.render().el