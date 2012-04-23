BTD = BTD or {}

BTD.ProjectsCollection = Backbone.Collection.extend
  model: BTD.ProjectModel
  url: '/project'
  localStorage: new Store 'BTD_Projects'
  activeProject: null

  initialize: ->
    _.bindAll @, 'addProject'
    BTD.Mediator.subscribe 'project:create', @addProject

  addProject: (attrs, success, error) ->
    @create attrs,
      'wait': true
      'success': success
      'error': error

  makeActive: (id) ->
    @activeProject = id
    BTD.Mediator.publish 'projectCollection:newActive'

  getActiveProject: ->
    this.get this.activeProject